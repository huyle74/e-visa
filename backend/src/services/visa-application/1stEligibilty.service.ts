import {
  eligibiltyRepo,
  visaApplicationRepo,
} from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";

const eligibilityService = {
  async create(userId: string, data: any) {
    const userExisted = await userRepos.findOne(userId);
    if (!userExisted) throw new Error("User not found");

    const applicationId = data.applicationId;

    if (applicationId) {
      const checkApplyExisted = await visaApplicationRepo.findOne(applicationId);
      if (checkApplyExisted) {
        const updateEligibility = await eligibiltyRepo.update(applicationId, data);
        return updateEligibility;
      }
    } else {
      const createNewApplication = await visaApplicationRepo.create(userId);
      if (!createNewApplication) throw new Error("Cannot create application form");

      const correlationId = createNewApplication.correlationId;
      const createEligibilty = await eligibiltyRepo.create(correlationId, data);
      if (!createEligibilty) throw new Error("Cannot create Eligibilty form");

      console.log(createEligibilty);

      return createEligibilty;
    }
  },
};

export default eligibilityService;
