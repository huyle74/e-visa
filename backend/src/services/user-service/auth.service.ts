import bcrypt from 'bcrypt';
import { loginDto } from '../../dto/auth.dto';
import userRepos from '../../repositories/user.repository';
import { generateToken } from '../../utils/jwt';

const loginService = async ({ email, password }: loginDto) => {
  const user = await userRepos.findOne({ email });
  if (!user) throw new Error('USer not found');

  console.log(user.password.length, user.password);

  const isMatchPassword = await bcrypt.compare(password, user.password);
  console.log('Match password:', isMatchPassword);
  if (!isMatchPassword) throw new Error('Wrong password');

  const token = generateToken(user);

  return { token, ...user };
};

export default loginService;
