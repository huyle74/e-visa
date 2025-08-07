import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/auth.dto';
import userRepos from '../repositories/user.repository';

const createAccountService = async (data: CreateUserDto) => {
  const { password, ...userData } = data;

  const checkExist = await userRepos.findOne(data.email);
  if (checkExist) throw new Error('This Email already in used');
  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await userRepos.create({
    ...userData,
    password: hashedPassword,
  });

  return createUser;
};

export default createAccountService;
