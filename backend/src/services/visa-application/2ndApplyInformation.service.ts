import { applyInformationRepo } from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";
import { ApplicationInformationInputDto } from "@/dto/visaApply/visaApply.dto";
import { fileConvert } from "@/utils/file";

const applicationInformationService = {
  async create(data: ApplicationInformationInputDto, userId: string) {
    const userExisted = await userRepos.findOne(userId);
    if (!userExisted) throw new Error("User not found");

    const result = await applyInformationRepo.upsert(data);
    return result;
  },

  async findOne(applicationId: string) {
    const row = await applyInformationRepo.findOne(applicationId);

    if (!row) throw new Error("Cannot find this application form");
    const { biodata, photograph, id, ...rest } = row;

    const BIODATA = fileConvert(biodata);
    const PHOTOGRAPH = fileConvert(photograph);

    return { ...rest, biodata: BIODATA, photograph: PHOTOGRAPH };
  },
};
export default applicationInformationService;
