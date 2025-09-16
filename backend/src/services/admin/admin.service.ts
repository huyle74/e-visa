import adminRepos from "@/repositories/admin.repository";
import { Role } from "@prisma/client";
import { verify } from "@/utils/jwt";

const adminService = {
  async getUserData(role: Role, id: number) {
    const userList = await adminRepos.listAllUser(role, id);
    if (!userList) throw new Error("Cannot find user list");

    return userList;
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

  async verifyAccessToken(accessToken: string) {
    const decode = verify(accessToken);

    if (!decode) return false;

    return true;
  },
};

export default adminService;
