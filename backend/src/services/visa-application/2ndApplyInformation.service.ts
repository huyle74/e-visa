import {
  applyInformationRepo,
  visaApplicationRepo,
} from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";
import { ApplicationInformationInputDto } from "@/dto/visaApply/visaApply.dto";

const applicationInformationService = {
  async create(data: ApplicationInformationInputDto, userId: string) {
    const userExisted = await userRepos.findOne(userId);
    if (!userExisted) throw new Error("User not found");

    const applicationId = data.applicationId;
    const checkApplyExist = await visaApplicationRepo.findOne(applicationId);
    console.log(checkApplyExist);
    if (!checkApplyExist) {
      throw new Error("This application not found");
    }

    const createNew = await applyInformationRepo.create(data.applicationId, data);
    return createNew;
  },
};
export default applicationInformationService;
