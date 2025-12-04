export const AnnualIncomeEnum = {
  UNDER_20000_USD: "Under $20,000 USD",
  BETWEEN_20000_40000_USD: "$20,000 – $40,000 USD",
  BETWEEN_40001_60000_USD: "$40,001 – $60,000 USD",
  BETWEEN_60001_80000_USD: "$60,001 – $80,000 USD",
  MORE_THAN_AND_OVER: "More than $80,000 USD",
  NO_INCOME: "No income",
} as const;

export const SexEnum = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
} as const;

export const OccupationEnum = {
  BUSINESS_OWNER: "Business Owner",
  EMPLOYEE: "Employee",
  FREELANCE: "Freelancer",
  GOVERNMENT_OFFICIAL: "Government Official",
  RETIRED: "Retired",
  STUDENT: "Student",
  UNEMPLOYED: "Unemployed",
  OTHER: "Other",
} as const;

export const VisaTypeEnum = {
  TOURIST: "Tourist Visa",
  TRANSIT: "Transit Visa",
  NON_IMMIGRANT: "Non-Immigrant Visa",
  SMART: "SMART Visa",
  COURTESY: "Courtesy Visa",
  LTR: "Long-Term Resident (LTR) Visa",
  DTV: "Digital Nomad (DTV) Visa",
  THAILAND_PRIVILEGE_CARD: "Thailand Privilege Card",
} as const;

export const MaritalStatusEnum = {
  SINGLE: "Single",
  MARRIED: "Married",
  COMMON_LAW_MARRIAGE: "Common-Law Marriage",
  CIVIL_UNION_DOMESTIC_PARTNERSHIP: "Civil Union / Domestic Partnership",
  WIDOWED: "Widowed",
  DIVORCED: "Divorced",
  SEPARATED: "Separated",
} as const;

export const VisitPurposeEnum = {
  VISIT_FAMILY: "Visit Family",
  TRAVEL: "Travel / Tourism",
  FOR_WORK: "Work",
} as const;

export const TravelDocumentTypeEnum = {
  CERTIFICATE_OF_IDENTITY_CI: "Certificate of Identity (CI)",
  PASSPORT: "Passport",
  SEAMANS_BOOK: "Seaman’s Book",
  TRAVEL_DOCUMENT: "Travel Document",
} as const;

export const DocumentTypeEnum = {
  ORDINARY_TRAVEL_DOCUMENT: "Ordinary Travel Document",
  DIPLOMATIC_PASSPORT: "Diplomatic Passport",
  OFFICIAL_SERVICE_PASSPORT: "Official / Service Passport",
  PUBLIC_AFFAIRS: "Public Affairs Passport",
} as const;

