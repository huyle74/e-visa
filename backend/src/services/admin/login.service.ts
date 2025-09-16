import bcrypt from "bcrypt";
import adminRepos from "@/repositories/admin.repository";
import {
  loginDto,
  ReCreatePassordDto,
  CreateAdminAccountDto,
} from "@/dto/auth.dto";
import { generateToken } from "@/utils/jwt";

const adminLoginService = {
  async login({ email, password }: loginDto) {
    const admin = await adminRepos.findAdminByEmail(email);
    if (!admin)
      throw new Error("User not found! Please enter your Admin Email.");

    const isMatchPassword = await bcrypt.compare(password, admin.password);
    if (!isMatchPassword) throw new Error("Wrong password");

    const accessToken = generateToken(admin);

    return {
      accessToken,
      name: admin.name,
      email: admin.email,
      id: admin.id,
      role: admin.role,
    };
  },
  async createNewpassword(data: ReCreatePassordDto) {
    if (data.password !== data.re_password)
      throw new Error("2 Password not match");

    const adminExisted = await adminRepos.findAdminByEmail(data.email);
    if (!adminExisted)
      throw new Error(
        "This email dont have authorization to access admin page"
      );

    const newPassword = bcrypt.hash(data.password, 10);
    const addNewPassWord = await adminRepos.updatePassword(
      data.email,
      newPassword
    );
    const { password, ...rest } = addNewPassWord;

    return rest;
  },

  async createAccount(data: CreateAdminAccountDto) {
    const { password, ...rest } = data;

    const isExistedEmail = await adminRepos.findAdminByEmail(data.email);
    if (isExistedEmail) throw new Error("This email is in used!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await adminRepos.create({
      ...rest,
      password: String(hashedPassword),
    });
    if (!newAdmin) throw new Error("Service: cannot create new admin account");

    return {
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role,
      name: newAdmin.name,
    };
  },
};

export default adminLoginService;
