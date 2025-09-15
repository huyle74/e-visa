import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

const adminRepos = {
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
      throw new Error(`Cannot creat admin account`);
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

  async listAllUser(role: "ADMIN" | "SUPER_ADMIN", id?: number) {
    try {
      if (role === "SUPER_ADMIN") {
        const allUser = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            phoneNumber: true,
            firstName: true,
            lastName: true,
            managerId: true,
          },
        });
        return allUser;
      }
      if (role === "ADMIN") {
        const allUser = await prisma.user.findMany({
          where: { managerId: id },
          take: 20,
          select: {
            id: true,
            email: true,
            phoneNumber: true,
            firstName: true,
            lastName: true,
          },
        });

        return allUser;
      }
    } catch (error) {
      throw new Error(`Cannot creat admin account`);
    }
  },

  async listAllApplication(role: "ADMIN" | "SUPER_ADMIN", id?: number) {
    try {
      if (role === "SUPER_ADMIN") {
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
      if (role === "ADMIN") {
        const allUser = await prisma.user.findMany({
          where: { managerId: id },
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
      throw new Error(`Cannot creat admin account`);
    }
  },
};

export default adminRepos;
