import bcrypt from "bcrypt";
import { loginDto } from "@/dto/auth.dto";
import userRepos from "../../repositories/user.repository";
import { generateToken } from "../../utils/jwt";

const loginService = async ({ email, password }: loginDto) => {
  console.log(email);
  const user: any = await userRepos.findByEmail(email);
  if (!user)
    throw new Error("User not found! Please enter your registerd Email.");

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) throw new Error("Wrong password");

  const accessToken = generateToken(user);

  return {
    accessToken,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user.id,
    role: user.role,
  };
};

export default loginService;
