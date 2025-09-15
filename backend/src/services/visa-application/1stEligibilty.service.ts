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
    const { fromCountry, toCountry, price, ...rest } = data;

    if (applicationId) {
      const checkApplyExisted =
        await visaApplicationRepo.findOne(applicationId);
      if (checkApplyExisted) {
        const updateEligibility = await eligibiltyRepo.update(
          applicationId,
          rest
        );
        return updateEligibility;
      }
    } else {
      const createNewApplication = await visaApplicationRepo.create(
        userId,
        fromCountry,
        toCountry,
        price
      );
      if (!createNewApplication)
        throw new Error("Cannot create application form");

      const correlationId = createNewApplication.correlationId;
      const createEligibilty = await eligibiltyRepo.create(correlationId, rest);
      if (!createEligibilty) throw new Error("Cannot create Eligibilty form");

      console.log(createEligibilty);
      return createEligibilty;
    }
  },
  async findOne(applicationId: string) {
    const row = await eligibiltyRepo.findOne(applicationId);
    if (!row) throw new Error("Cannot find this application form");
    return row;
  },
};

export default eligibilityService;
