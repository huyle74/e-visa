import { visaApplicationRepo } from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";
import { checkApplyExist } from "@/services/visa-application/util";

const visaApplicationService = async (userId: string | undefined) => {
  if (!userId) throw new Error("User Param not found");
  
  const checkUser = await userRepos.findOne(userId);
  if (!checkUser) throw new Error("User not found");

  const newApplication = await visaApplicationRepo.create(userId);
  return newApplication;
};

export default visaApplicationService;
