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

  const applicationId = data.applicationId;
  const checkApplyExisted = await visaApplicationRepo.findOne(applicationId);
  if (checkApplyExisted) {
    const updateData = await travelInfoRepos.update(applicationId, data);
    return updateData;
  } else {
    const createNew = await travelInfoRepos.create(applicationId, data);
  }
};

export default travelInformationService;
