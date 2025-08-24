import { eligibiltyRepo } from "@/repositories/visaApplication.repository";

export const checkApplyExist = async (applicationId: string) => {
  let isExisted = false;
  const checkEligibilty = await eligibiltyRepo.findOne(applicationId);
  if (checkEligibilty) {
    isExisted = true;
  }

  return isExisted
};
