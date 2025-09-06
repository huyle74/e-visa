import { applyInformationRepo } from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";
import { ApplicationInformationInputDto } from "@/dto/visaApply/visaApply.dto";

const applicationInformationService = {
  async create(data: ApplicationInformationInputDto, userId: string) {
    const userExisted = await userRepos.findOne(userId);
    if (!userExisted) throw new Error("User not found");

    const result = await applyInformationRepo.upsert(data);
    console.log(result);
    return result;
  },

  async findOne(applicationId: string) {
    const row = await applyInformationRepo.findOne(applicationId);

    if (!row) throw new Error("Cannot find this application form");
    return row;
  },
};
export default applicationInformationService;
