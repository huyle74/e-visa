import fs from "fs";
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
    const { biodata, photograph, id, ...rest } = row;

    const BIODATA = fileConvert(biodata);
    const PHOTOGRAPH = fileConvert(photograph);

    return { ...rest, biodata: BIODATA, photograph: PHOTOGRAPH };
  },
};
export default applicationInformationService;

const fileConvert = (file: any) => {
  const { path, originalname, mimetype } = file;
  try {
    console.log(originalname, mimetype);
    const getFile = fs.readFileSync(path);
    return { data: getFile.toString("base64"), name: originalname, type: mimetype };
  } catch (error) {
    console.error(`Failed to read file: ${path}`, error);

    return { data: null, name: originalname, type: mimetype };
  }
};
