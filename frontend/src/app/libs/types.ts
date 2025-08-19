import { Dayjs } from "dayjs";

type DateType = Dayjs | null;

export interface EligibilityInputDto {
  applyAt: string;
  currentLocation: string;
  documentType: string;
  inputCountryPassport: string;
  numberOfEntries: string;
  visaType: string;
  visitPurpose: string;
}

export interface ApplicationInformationInputDto {
  personalInfo: {
    title: string;
    sex: string;
    fistName: string;
    middleName?: string;
    familyName: string;
    contactNo: string;
    email: string;
    nationality: string;
    otherNationality: boolean;
    nationalityBirth: string;
    cityBirth: string;
    birthDate: DateType;
    maritalStatus: string;
    anotherNationity: string;
  };
  travelDocument: {
    type: string;
    docsNumber: string;
    issuesPlace: string;
    issuesDate: DateType;
    expiryDate: DateType;
  };
  address: {
    homeAddress: string;
    country: string;
    state: string;
    city: string;
    currentAddress: boolean;
  };
  employment: {
    occupation: string;
    company: string;
    annualIncome: string;
  };
}

export interface AccommodationInputDto {
  type: string;
  name: string;
  street: string;
  city: string;
  contactNo: string;
  duration: string;
}

export interface TravelInformationInputDto {
  travelInfo: {
    arrivalDate: DateType;
    departureDate: DateType;
    country: string;
    arrivalPort: string;
    hadVisited: boolean;
    didApply: boolean;
    partOfTour: boolean;
    transportationVehicle: string;
    transportMode: string;
    shipName?: string;
    fightNo?: string;
    vehicleNumber?: string;
  };
  Accommodation: {
    AccommodationInfo: AccommodationInputDto[];
    additionalAccommodation: boolean;
  };
}

export interface TransportationVehicleInputDto {
  title: string;
  values: string[];
  placeholder: string;
}
