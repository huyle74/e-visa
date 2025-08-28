import { Dayjs } from "dayjs";

type DateType = Dayjs | null;

export interface EligibilityInputDto {
  applicationId?: string | null;
  applyAt: string | null;
  currentLocation: string | null;
  documentType: string | null;
  inputCountryPassport: string | null;
  numberOfEntries: string | null;
  visaType: string | null;
  visitPurpose: string | null;
}

export interface ApplicationInformationInputDto {
  applicationId: string;

  title: string;
  sex: string;
  firstName: string;
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
  anotherNationality: string;

  // travelDocument
  documentType: string;
  documentNumber: string;
  issuesPlace: string;
  issuesDate: DateType;
  expiryDate: DateType;

  // address
  homeAddress: string;
  addressCountry: string;
  addressState: string;
  addressCity: string;
  currentAddress: boolean;

  // Employment
  annualIncome: string;
  occupation: string;
  company: string;
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
