import userRepos from '../../repositories/user.repository';

const verifyEmailService = async (verifyToken: string) => {
  const checkUser = await userRepos.findOne({ verifyToken });

  if (!checkUser) throw new Error('Failed to verify Email');

  const email = checkUser.email;
  const updateVerify = await userRepos.update(
    { email },
    {
      emailVerify: true,
    }
  );

  return updateVerify;
};

export default verifyEmailService;
