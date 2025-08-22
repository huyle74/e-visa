import { Dayjs } from "dayjs";

type DateType = Dayjs | null;

export interface EligibilityInputDto {
  applyAt: string | null;
  currentLocation: string | null;
  documentType: string | null;
  inputCountryPassport: string | null;
  numberOfEntries: string | null;
  visaType: string | null;
  visitPurpose: string | null;
}

export interface ApplicationInformationInputDto {
  personalInfo: {
    title: string | null;
    sex: string | null;
    fistName: string | null;
    middleName?: string | null;
    familyName: string | null;
    contactNo: string | null;
    email: string | null;
    nationality: string | null;
    otherNationality: boolean | null;
    nationalityBirth: string | null;
    cityBirth: string | null;
    birthDate: DateType | null;
    maritalStatus: string | null;
    anotherNationity: string | null;
  };
  travelDocument: {
    type: string | null;
    docsNumber: string | null;
    issuesPlace: string | null;
    issuesDate: DateType | null;
    expiryDate: DateType | null;
  };
  address: {
    homeAddress: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    currentAddress: boolean | null;
  };
  employment: {
    occupation: string | null;
    company: string | null;
    annualIncome: string | null;
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
    arrivalDate: DateType | null;
    departureDate: DateType | null;
    country: string;
    arrivalPort: string;
    hadVisited: boolean;
    didApply: boolean;
    partOfTour: boolean;
    transportationVehicle: string;
    transportMode: string;
    shipName?: string;
    fightNo?: string | null;
    vehicleNumber?: string | null;
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

export type FileInputDto = File | null;

export interface SupportingDocumentInputDto {
  biodata: FileInputDto;
  photograph: FileInputDto;
  currentLocation: FileInputDto;
  bookingConfirmation: FileInputDto;
  proofOfAccommodation: FileInputDto;
  financialEvidence: FileInputDto;
}
