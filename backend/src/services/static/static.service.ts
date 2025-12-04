import countryRepo from "@/repositories/country.repository";
import {
  VisaTypeEnum,
  DocumentTypeEnum,
  VisitPurposeEnum,
  SexEnum,
  MaritalStatusEnum,
  TravelDocumentTypeEnum,
  OccupationEnum,
  AnnualIncomeEnum,
} from "@dto/enum";

export const staticService = {
  async getAllCountries() {
    const countries = await countryRepo.findAllCountry();

    if (!countries)
      throw new Error("Get countries data from database got error");

    return countries;
  },

  async getCitiesByState(state: string) {
    const cities = await countryRepo.findAllCity(state);
    if (!cities) throw new Error("Cannot find citis with this state");

    return cities;
  },

  async getStatesByCountry(country: string) {
    const states = await countryRepo.findAllState(country);
    if (!states) throw new Error("Cannot find cities with this state");

    return states;
  },

  async getEligibiltyOption() {
    const visaTypes = Object.values(VisaTypeEnum);
    const documentType = Object.values(DocumentTypeEnum);
    const visitPurpose = Object.values(VisitPurposeEnum);

    return { visaTypes, documentType, visitPurpose };
  },

  async getApplicationInformationOption() {
    const title = ["Mr.", "Ms."];
    const sex = Object.values(SexEnum);
    const maritalStatus = Object.values(MaritalStatusEnum);
    const travelDocumentType = Object.values(TravelDocumentTypeEnum);
    const occupation = Object.values(OccupationEnum);
    const annualIncome = Object.values(AnnualIncomeEnum);

    return {
      title,
      sex,
      maritalStatus,
      travelDocumentType,
      occupation,
      annualIncome,
    };
  },
};
