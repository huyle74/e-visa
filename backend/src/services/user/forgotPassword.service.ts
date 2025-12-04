import bcrypt from "bcrypt";
import userRepos from "@/repositories/user.repository";
import { generateToken } from "@/utils/jwt";
import sendEmail from "@/utils/sendEmail";
import { url } from "@/config/envLoader";

interface ChangePassword {
  email: string;
  password: string;
  re_password: string;
}

const forgotPasswordService = async (data: ChangePassword) => {
  const { email, password, re_password } = data;
  if (password !== re_password) throw new Error("2 Passwords do not match");

  const user = await userRepos.findByEmail(email);
  if (!user) throw new Error("User do not found");

  const verifyToken = generateToken({ email });
  const link = url + "/verify-email?token=" + verifyToken;

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatePassword = await userRepos.update(
    { email },
    { password: hashedPassword, verifyToken }
  );

  const userName = user.firstName + " " + user.lastName;

  sendEmail(email, link, userName);
  return updatePassword;
};

export default forgotPasswordService;
