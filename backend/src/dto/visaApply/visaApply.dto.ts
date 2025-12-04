import {
  MaritalStatus,
  AnnualIncome,
  Occupation,
  TravelDocumentType,
  Sex,
  Document,
} from "@/generate/prisma/client";

export interface EligibilityInputDto {
  applyAt: string;
  currentLocation: string;
  documentType: string;
  inputCountryPassport: string;
  numberOfEntries: string;
  visaType: string;
  visitPurpose: string;
}

export type FileJson = {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  filename?: string;
  path?: string;
  destination?: string;
};

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
  birthDate: Date;
  maritalStatus: string;
  anotherNationality: string;

  // travelDocument
  documentType: string;
  documentNumber: string;
  issuesPlace: string;
  issuesDate: Date;
  expiryDate: Date;

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

  // files
  biodata: FileJson;
  photograph: FileJson;

  userIdApplied: string;
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
  applicationId: string;
  arrivalDate: Date;
  departureDate: Date;
  country: string;
  arrivalPort: string;
  hadVisited: boolean;
  didApply: boolean;
  partOfTour: boolean;
  transportationVehicle: string;
  transportMode: string;
  shipName: string;
  fightNo: string;
  vehicleNumber: string;
  accommodations: AccommodationInputDto[];

  additionalAccommodation: boolean;
}

export interface TransportationVehicleInputDto {
  title: string;
  values: string[];
  placeholder: string;
}

export interface SupportingDocumentInputDto {
  applicationId: string;
  type: Document;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  fileUrl?: string;
  sha256?: string;
  meta?: object;
}
