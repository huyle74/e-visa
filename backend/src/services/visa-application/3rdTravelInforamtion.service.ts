import { TravelInformationInputDto } from "@/dto/visaApply/visaApply.dto";
import {
  travelInfoRepos,
} from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";

const travelInformationService = {
  async create(userId: string, data: TravelInformationInputDto) {
    const checkUser = await userRepos.findOne(userId);
    if (!checkUser) throw new Error("User not found");

    const updateData = await travelInfoRepos.upsert(data);
    return updateData;
  },
  async findOne(applicationId: string) {
    const row = await travelInfoRepos.findOne(applicationId);
    if (!row) throw new Error("Cannot find this application form");
    return row;
  },
};

export default travelInformationService;
