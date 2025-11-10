import { Dayjs } from "dayjs";

type DateType = Dayjs | null;

export interface CountrySelectionDto {
  fromCountry: string;
  toCountry: string;
}

export interface EligibilityInputDto {
  applicationId?: string;
  applyAt: string;
  currentLocation: string;
  documentType: string;
  inputCountryPassport: string;
  numberOfEntries: string;
  visaType: string;
  visitPurpose: string;
}

export interface ApplicationInformationInputDto {
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

  // FILES
  biodata: File | null;
  photograph: File | null;
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
  // travel Information:
  arrivalDate: DateType | null;
  departureDate: DateType | null;
  country: string;
  arrivalPort: string;
  hadVisited: boolean;
  didApply: boolean;
  partOfTour: boolean;
  transportMode: string;
  shipName?: string;
  fightNo?: string | null;
  vehicleNumber?: string | null;

  // Accommodation
  accommodations: AccommodationInputDto[];
  additionalAccommodation: boolean;
}

export interface TransportationVehicleInputDto {
  title: string;
  values: string[];
  placeholder: string;
}

export type FileInputDto = File | null;

export interface SupportingDocumentInputDto {
  BIODATA: FileInputDto;
  PHOTOGRAPH: FileInputDto;
  CURRENT_LOCATION: FileInputDto;
  BOOKING_CONFIRMATION: FileInputDto;
  PROOF_OF_ACCOMMODATION: FileInputDto;
  FINANCIAL_EVIDENCE: FileInputDto;
}
