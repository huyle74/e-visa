import adminRepos from "@/repositories/admin.repository";
import { Role } from "@prisma/client";

const adminService = {
  async getUserData(role: Role, id: number) {
    const userList = await adminRepos.listAllUser(role, id);
    if (!userList) throw new Error("Cannot find user list");

    return userList;
  },
};

export default adminService;
