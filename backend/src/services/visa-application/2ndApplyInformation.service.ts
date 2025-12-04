import { applyInformationRepo } from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";
import { ApplicationInformationInputDto } from "@/dto/visaApply/visaApply.dto";
import { fileConvert } from "@/utils/file";
import { mapEnum } from "./util";
import {
  AnnualIncomeEnum,
  MaritalStatusEnum,
  SexEnum,
  OccupationEnum,
  TravelDocumentTypeEnum,
} from "@/dto/enum";

const applicationInformationService = {
  async create(data: ApplicationInformationInputDto, userId: string) {
    try {
      const userExisted = await userRepos.findOne(userId);
      if (!userExisted) throw new Error("User not found");

      const {
        annualIncome,
        maritalStatus,
        documentType,
        sex,
        occupation,
        ...rest
      } = data;
      const inputData = {
        ...rest,
        annualIncome: mapEnum(AnnualIncomeEnum, annualIncome),
        maritalStatus: mapEnum(MaritalStatusEnum, maritalStatus),
        documentType: mapEnum(TravelDocumentTypeEnum, documentType),
        sex: mapEnum(SexEnum, sex),
        occupation: mapEnum(OccupationEnum, occupation),
      };

      const result = await applyInformationRepo.upsert(inputData);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Server error");
    }
  },

  async findOne(applicationId: string) {
    const row = await applyInformationRepo.findOne(applicationId);

    if (!row) throw new Error("Cannot find this application form");
    const { biodata, photograph, id, ...rest } = row;

    const BIODATA = await fileConvert(biodata);
    const PHOTOGRAPH = await fileConvert(photograph);

    return { ...rest, biodata: BIODATA, photograph: PHOTOGRAPH };
  },
};
export default applicationInformationService;
