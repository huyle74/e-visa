import adminRepos from "@/repositories/admin.repository";
import notificationRepo from "@/repositories/notification.repository";
import { Document, Role } from "@/generate/prisma/client";
import { AdminDataDto } from "@/dto/admin.dto";
import { fileConvert } from "@/utils/file";
import { SortOrder, SortBy, ResultsType, PostVisaResultDto } from "./admin.dto";
import { getIO } from "@/socket/io";

const adminService = {
  async getListCostumers(
    role: Role,
    id: number,
    sortOrder: SortOrder = "desc",
    currentPage: number,
    pageSize: number,
    sortBy: SortBy
  ) {
    const userList = await adminRepos.listAllCustomers(
      role,
      id,
      sortOrder,
      currentPage,
      pageSize,
      sortBy
    );
    if (!userList) throw new Error("Cannot find user list");

    const results = userList.allUsers.map(({ _count, ...rest }) => {
      return {
        ...rest,
        totalApplications: _count.application,
      };
    });

    return { results, total: userList.total };
  },

  async listAllAdmin(role: Role, email: string) {
    if (role !== "SUPER_ADMIN")
      throw new Error("You dont have authorization to access admin list");

    const checkEmailExisted = await adminRepos.findAdminByEmail(email);
    if (!checkEmailExisted)
      throw new Error("This super admin email do not exist");

    const allAdmin = await adminRepos.listAllAdmin();

    return allAdmin;
  },

  async getOneCustomer(customerId: string, admin: AdminDataDto) {
    const { id, role } = admin;

    if (role === Role.ADMIN) {
      const checkAccessibility = await adminRepos.adminHasCustomer(
        id,
        customerId
      );
      if (!checkAccessibility)
        throw new Error(
          "This admin do not have authorization to access this user"
        );
    }

    const customer = await adminRepos.getCustomerById(customerId);
    if (!customer) throw new Error("Customer not found");

    return customer;
  },
  async listAllApplicationsByCustomerId(
    customerId: string,
    admin: AdminDataDto
  ) {
    try {
      const { id, role } = admin;

      if (role === Role.ADMIN) {
        const checkAccessibility = await adminRepos.adminHasCustomer(
          id,
          customerId
        );
        if (!checkAccessibility)
          throw new Error(
            "This admin do not have authorization to access this user"
          );
      }

      const applications =
        await adminRepos.listAllApplicationByCustomerId(customerId);

      return applications;
    } catch (error) {
      throw new Error("Cannot get application list");
    }
  },

  async getOneApplication(admin: AdminDataDto, applicationId: string) {
    const { id, role } = admin;

    if (role === Role.ADMIN) {
      const checkAccessibility = await adminRepos.adminCanAccessApplication(
        id,
        applicationId
      );
      if (!checkAccessibility)
        throw new Error(
          "This admin do not have authorization to access this application"
        );
    }
    const application =
      await adminRepos.getApplicationsByCustomerId(applicationId);
    if (!application) throw new Error("Application not found");

    const { ApplyInformation, ...rest } = application;

    if (ApplyInformation) {
      const biodata = (await fileConvert(ApplyInformation?.biodata)) || null;
      const photograph =
        (await fileConvert(ApplyInformation?.photograph)) || null;

      const result = {
        ...rest,
        ApplyInformation: { ...ApplyInformation, biodata, photograph },
      };

      return result;
    } else return application;
  },
  async getSupportingDocument(
    admin: AdminDataDto,
    applicationId: string,
    field: (typeof Document)[keyof typeof Document]
  ) {
    const { id, role } = admin;

    if (role === Role.ADMIN) {
      const checkAccessibility = await adminRepos.adminCanAccessApplication(
        id,
        applicationId
      );
      if (!checkAccessibility)
        throw new Error(
          "This admin do not have authorization to access this application"
        );
    }
    const type = Document[field];
    const document = await adminRepos.getSupportingDocumentByApplicationId(
      applicationId,
      type
    );

    return document;
  },

  // ADMIN ANNOUNCE VISA RESULT
  async postVisaResult(data: PostVisaResultDto) {
    let message: string = "";
    const { adminId, applicationId, result, userId } = data;

    await adminRepos.adminCanAccessApplication(Number(adminId), applicationId);

    if (result === ResultsType.SUCCESS) {
      message =
        "Great news! Your visa has been successfully approved. Please check you email to receive the visa document";
    }
    if (result === ResultsType.FAILED) {
      message = "Sorry! Your visa application has been declined.";
    }

    const newNotification = await notificationRepo.createUseNotification({
      message,
      title: "Visa Result",
      notificationsId: 1,
      userId,
      status: "UNREAD",
    });
    if (newNotification) {
      const io = getIO();
      io.on("connection", (socket) => {
        socket.emit("notification", {
          data: newNotification,
        });
      });
    }

    return newNotification;
  },
};

export default adminService;
