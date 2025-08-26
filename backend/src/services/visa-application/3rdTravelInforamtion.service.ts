import { TravelInformationInputDto } from "@/dto/visaApply/visaApply.dto";
import {
  travelInfoRepos,
  visaApplicationRepo,
} from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";

const travelInformationService = async (
  userId: string,
  data: TravelInformationInputDto
) => {
  const checkUser = await userRepos.findOne(userId);
  if (!checkUser) throw new Error("User not found");

  const updateData = await travelInfoRepos.upsert(data);
  return updateData;
};

export default travelInformationService;
