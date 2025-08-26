import {
  eligibiltyRepo,
  visaApplicationRepo,
} from "@/repositories/visaApplication.repository";
import { checkUser } from "./util";

const eligibilityService = {
  async create(user: any, userId: string, data: any) {
    const checkAuth = await checkUser(user.email, userId);
    if (checkAuth === false) throw new Error("Cannot authenticate this user");

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
