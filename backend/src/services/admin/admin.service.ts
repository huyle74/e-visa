import adminRepos from "@/repositories/admin.repository";
import { Document, Role } from "@prisma/client";
import { AdminDataDto } from "@/dto/admin.dto";
import { fileConvert } from "@/utils/file";

const adminService = {
  async getListCostumers(role: Role, id: number) {
    const userList = await adminRepos.listAllCustomers(role, id);
    if (!userList) throw new Error("Cannot find user list");

    const results = userList.map(({ _count, ...rest }) => {
      return { ...rest, totalApplications: _count.application };
    });

    return results;
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
      console.log("\nHERE\n");
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
};

export default adminService;
