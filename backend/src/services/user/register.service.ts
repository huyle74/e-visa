import bcrypt from "bcrypt";
import { CreateUserDto } from "@/dto/auth.dto";
import userRepos from "../../repositories/user.repository";
import sendEmail from "@/utils/sendEmail";
import { url } from "../../config/envLoader";
import { generateToken } from "@/utils/jwt";

const createAccountService = async (data: CreateUserDto) => {
  const { password, email, nation, ...userData } = data;

  const verifyToken = generateToken({ email });
  const link = url + "/verify-email?token=" + verifyToken;

  const checkExist = await userRepos.findOne(email);
  if (checkExist) throw new Error("This Email already in used");
  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await userRepos.create({
    ...userData,
    email,
    password: hashedPassword,
    verifyToken,
    nation: { connect: { iso2: nation } },
  });

  sendEmail(email, link);

  return createUser;
};

export default createAccountService;
