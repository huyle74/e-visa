import prisma from "@/prisma/prisma";
import { Document, Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import { paginationHelper } from "@/utils/paginationHelper";
import { SortOrder, SortBy } from "@/services/admin/admin.dto";

const adminRepos = {
  async adminHasCustomer(adminId: number, customerId: string) {
    try {
      const checkHad = await prisma.admin.findFirst({
        where: {
          id: adminId,
          manage: {
            some: { id: customerId },
          },
        },
      });
      if (!checkHad) throw new Error("user Not found");

      return checkHad;
    } catch (error) {
      throw new Error("You do not have this Customer");
    }
  },
  async adminCanAccessApplication(adminId: number, applicationId: string) {
    try {
      const check = await prisma.user.findFirst({
        where: {
          managerId: adminId,
          application: { some: { correlationId: applicationId } },
        },
      });
      if (!check) throw new Error("Application not found");

      return check;
    } catch (error) {
      throw new Error("You do not have authority to access this application");
    }
  },
  async findAdminByEmail(email: string) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: true,
        },
      });

      return admin;
    } catch (error) {
      throw new Error(`Cannot find this admin by ${email}`);
    }
  },
  async create(data: Prisma.AdminCreateInput) {
    try {
      const newAdmin = await prisma.admin.create({ data });

      return newAdmin;
    } catch (error) {
      throw new Error(`Cannot create admin account`);
    }
  },
  async updatePassword(email: string, password: any) {
    try {
      const addNewPassWord = await prisma.admin.update({
        where: { email },
        data: { password },
      });

      return addNewPassWord;
    } catch (error) {
      throw new Error("Cannot add new password to database");
    }
  },

  async listAllCustomers(
    role: Role,
    id?: number,
    sortOrder: SortOrder = "desc",
    currentPage: number = 1,
    pageSize: number = 10,
    sortBy: SortBy = "createAt"
  ) {
    try {
      let allUsers: any[] = [];
      let totalUsers;
      const query = paginationHelper({
        pageSize,
        currentPage,
        sortBy,
        sortOrder,
      });
      const include = {
        id: true,
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        managerId: true,
        _count: { select: { application: true } },
        createAt: true,
      };

      if (role === Role.SUPER_ADMIN) {
        allUsers = await prisma.user.findMany({
          select: { ...include },
          ...query,
        });
        totalUsers = await prisma.user.count();
      }
      if (role === Role.ADMIN) {
        allUsers = await prisma.user.findMany({
          where: { managerId: id },
          select: { ...include },
          ...query,
        });
        totalUsers = await prisma.user.count({ where: { managerId: id } });
      }

      return { allUsers, total: totalUsers };
    } catch (error) {
      throw new Error(`Cannot find customers list`);
    }
  },

  async listAllApplication(role: Role, adminId?: number) {
    try {
      if (role === Role.SUPER_ADMIN) {
        const allUser = await prisma.user.findMany({
          select: {
            application: {
              select: {
                correlationId: true,
                fromCountry: true,
                toCountry: true,
                price: true,
                payment: true,
              },
            },
          },
        });
        return allUser;
      }
      if (role === Role.ADMIN) {
        const allUser = await prisma.user.findMany({
          where: { managerId: adminId },
          select: {
            application: {
              select: {
                correlationId: true,
                fromCountry: true,
                toCountry: true,
                price: true,
                payment: true,
              },
            },
          },
        });

        return allUser;
      }
    } catch (error) {
      throw new Error(`Cannot create admin account`);
    }
  },
  async listAllAdmin() {
    try {
      const allAdmin = await prisma.admin.findMany({
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          password: false,
        },
      });

      return allAdmin;
    } catch (error) {
      throw new Error("Cannot list all Admin");
    }
  },
  async getApplicationsByCustomerId(applicationId: string) {
    try {
      const applications = await prisma.application.findUnique({
        where: {
          correlationId: applicationId,
        },
        select: {
          createdAt: true,
          correlationId: true,
          payment: true,
          price: true,
          updatedAt: true,
          fromCountry: true,
          toCountry: true,
          Eligibility: true,
          travelInformation: true,
          ApplyInformation: true,
        },
      });
      return applications;
    } catch (error) {
      throw new Error("Cannot get application by customer ID");
    }
  },
  async getSupportingDocumentByApplicationId(
    applicationId: string,
    field: Document
  ) {
    try {
      const document = await prisma.supportingDocument.findUnique({
        where: { applicationId_type: { applicationId, type: field } },
        select: {
          originalName: true,
          mimeType: true,
          storageKey: true,
          sizeBytes: true,
        },
      });

      return document;
    } catch (error) {
      throw new Error(`Cannot get ${field} supporting document`);
    }
  },
  async getCustomerById(id: string) {
    try {
      const customer = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          firstName: true,
          lastName: true,
          application: true,
        },
      });

      return customer;
    } catch (error) {
      throw new Error("Cannot get this user by id");
    }
  },
  async listAllApplicationByCustomerId(customerId: string) {
    try {
      const applications = await prisma.user.findMany({
        where: { id: customerId },
        select: {
          application: true,
        },
      });

      return applications;
    } catch (error) {
      throw new Error("Cannot get list application by customer id");
    }
  },
};

export default adminRepos;
