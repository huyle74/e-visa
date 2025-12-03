import countryRepo from "@/repositories/country.repository";
import {
  visaType,
  DocumentType,
  VisitPurpose,
  Sex,
  MaritalStatus,
  TravelDocumentType,
  Occupation,
  AnnualIncome,
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
    const visaTypes = Object.values(visaType);
    const documentType = Object.values(DocumentType);
    const visitPurpose = Object.values(VisitPurpose);

    return { visaTypes, documentType, visitPurpose };
  },

  async getApplicationInformationOption() {
    const title = ["Mr.", "Ms."];
    const sex = Object.values(Sex);
    const maritalStatus = Object.values(MaritalStatus);
    const travelDocumentType = Object.values(TravelDocumentType);
    const occupation = Object.values(Occupation);
    const annualIncome = Object.values(AnnualIncome);

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
