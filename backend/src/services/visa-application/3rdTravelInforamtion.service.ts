import { TravelInformationInputDto } from "@/dto/visaApply/visaApply.dto";
import { travelInfoRepos } from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";

const travelInformationService = {
  async create(userId: string, data: TravelInformationInputDto) {
    const checkUser = await userRepos.findOne(userId);
    if (!checkUser) throw new Error("User not found");

    const updateData = await travelInfoRepos.upsert(data);
    return updateData;
  },
  async findOne(applicationId: string) {
    const rows = await travelInfoRepos.findOne(applicationId);

    console.log(applicationId);

    if (!rows) throw new Error("Cannot find this application form");
    const { id, ...rest } = rows;

    return rest;
  },
};

export default travelInformationService;
