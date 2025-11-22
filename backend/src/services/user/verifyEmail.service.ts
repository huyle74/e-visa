import userRepos from "../../repositories/user.repository";

const verifyEmailService = async (email: string) => {
  const checkUser = await userRepos.findByEmail(email);
  if (!checkUser) throw new Error("Failed to verify Email");

  const verifiedEmail = checkUser.email;
  const updateVerify = await userRepos.update(
    { email: verifiedEmail },
    {
      emailVerify: true,
    }
  );

  return updateVerify;
};

export default verifyEmailService;
