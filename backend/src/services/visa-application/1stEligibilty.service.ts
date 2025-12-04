import {
  eligibiltyRepo,
  visaApplicationRepo,
} from "@/repositories/visaApplication.repository";
import { checkUser } from "./util";
import { VisaTypeEnum, VisitPurposeEnum, DocumentTypeEnum } from "@/dto/enum";
import { mapEnum } from "./util";

const eligibilityService = {
  async create(user: any, userId: string, data: Eligibility) {
    const checkAuth = await checkUser(user.email, userId);
    if (checkAuth === false) throw new Error("Cannot authenticate this user");

    const {
      fromCountry,
      toCountry,
      price,
      applicationId,
      visaType,
      visitPurpose,
      documentType,
      ...rest
    } = data;

    const dataInput = {
      ...rest,
      visaType: mapEnum(VisaTypeEnum, visaType),
      visitPurpose: mapEnum(VisitPurposeEnum, visitPurpose),
      documentType: mapEnum(DocumentTypeEnum, documentType),
    };

    if (applicationId) {
      const checkApplyExisted =
        await visaApplicationRepo.findOne(applicationId);
      if (checkApplyExisted) {
        const updateEligibility = await eligibiltyRepo.update(
          applicationId,

          dataInput
        );
        return updateEligibility;
      }
    } else {
      const createNewApplication = await visaApplicationRepo.create(
        userId,
        fromCountry,
        toCountry,
        price
      );
      if (!createNewApplication)
        throw new Error("Cannot create application form");

      const correlationId = createNewApplication.correlationId;
      const createEligibilty = await eligibiltyRepo.create(
        correlationId,
        dataInput
      );
      if (!createEligibilty) throw new Error("Cannot create Eligibilty form");

      console.log(createEligibilty);
      return createEligibilty;
    }
  },
  async findOne(applicationId: string) {
    const row = await eligibiltyRepo.findOne(applicationId);
    if (!row) throw new Error("Cannot find this application form");
    return row;
  },
};

export default eligibilityService;

interface Eligibility {
  applicationId: string;
  applyAt: string;
  currentLocation: string;
  inputCountryPassport: string;
  numberOfEntries: string | number;
  fromCountry: string;
  toCountry: string;
  visaType: string;
  visitPurpose: string;
  documentType: string;
  price: number;
}
