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

    const result = await applyInformationRepo.upsert(data);
    return result;
  },
};
export default applicationInformationService;
