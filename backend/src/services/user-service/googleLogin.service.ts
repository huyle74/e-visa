import userRepos from '../../repositories/user.repository';
import verifyGoogleTokenId from '../../utils/verifyGoogleTokenId';
import { generateToken } from '../../utils/jwt';

const googleLoginService = async (credentials: any) => {
  const id_token = credentials?.id_token;
  const payload = await verifyGoogleTokenId(id_token);
  if (!payload) throw new Error('Failed to verify google token id');

  const email = payload.email || '';
  const verifyToken = generateToken({ email });
  const firstName = payload.given_name || '';
  const lastName = payload.family_name || '';
  const checkUserExist = await userRepos.findOne({ email });
  if (!checkUserExist) {
    const user = {
      email,
      firstName,
      lastName,
      emailVerify: payload.email_verified || false,
      password: 'null',
      verifyToken,
    };
    const createUser = await userRepos.create({
      ...user,
      nation: { connect: { iso2: 'undefined' } },
    });
    return createUser;
  }
  return { firstName, lastName, email, verifyToken };
};

export default googleLoginService;
