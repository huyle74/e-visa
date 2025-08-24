import { body } from "express-validator";

export const eligibiltyValidator = [
  body("applyAt").notEmpty().withMessage("Apply place is required"),
  body("currentLocation").notEmpty().withMessage("Current location is required"),
  body("documentType").notEmpty().withMessage("Document type is required"),
  body("inputCountryPassport").notEmpty().withMessage("inputCountryPassport is required"),
  body("numberOfEntries").notEmpty().withMessage("Entries number is required"),
  body("visaType").notEmpty().withMessage("Visa type is required"),
  body("visitPurpose").notEmpty().withMessage("Visit Purpose is required"),
];

const personalInfo = (el: string) => `personalInfo.${el}`;
const travelDocument = (el: string) => `travelDocument.${el}`;
const address = (el: string) => `address.${el}`;
const employment = (el: string) => `employment.${el}`;

export const applicationInformationValidator = [
  // personalInfo
  body(personalInfo("applyAt")).notEmpty().withMessage("title is required"),
  body(personalInfo("sex")).notEmpty().withMessage("sex is required"),
  body(personalInfo("fistName")).notEmpty().withMessage("fistName is required"),
  body(personalInfo("familyName")).notEmpty().withMessage("familyName is required"),
  body(personalInfo("contactNo")).notEmpty().withMessage("contact phone is required"),
  body(personalInfo("email")).isEmail().notEmpty().withMessage("email is required"),
  body(personalInfo("nationality")).notEmpty().withMessage("nationality is required"),
  body(personalInfo("otherNationality"))
    .notEmpty()
    .withMessage("otherNationality is required"),
  body(personalInfo("nationalityBirth"))
    .notEmpty()
    .withMessage("nationalityBirth is required"),
  body(personalInfo("cityBirth")).notEmpty().withMessage("cityBirth is required"),
  body(personalInfo("birthDate")).notEmpty().withMessage("birthDate is required"),
  body(personalInfo("maritalStatus")).notEmpty().withMessage("maritalStatus is required"),
  body(personalInfo("anotherNationity"))
    .notEmpty()
    .withMessage("anotherNationity is required"),

  // travelDocument
  body(travelDocument("type")).notEmpty().withMessage("type is required"),
  body(travelDocument("docsNumber")).notEmpty().withMessage("docsNumber is required"),
  body(travelDocument("issuesPlace")).notEmpty().withMessage("issuesPlace is required"),
  body(travelDocument("issuesDate")).notEmpty().withMessage("issuesDate is required"),
  body(travelDocument("expiryDate")).notEmpty().withMessage("expiryDate is required"),

  // Address
  body(address("homeAddress")).notEmpty().withMessage("homeAddress is required"),
  body(address("country")).notEmpty().withMessage("country is required"),
  body(address("state")).notEmpty().withMessage("state is required"),
  body(address("city")).notEmpty().withMessage("city is required"),
  body(address("currentAddress")).notEmpty().withMessage("currentAddress is required"),

  // Employment
  body(employment("occupation")).notEmpty().withMessage("occupation is required"),
  body(employment("company")).notEmpty().withMessage("company is required"),
  body(employment("annualIncome")).notEmpty().withMessage("annualIncome is required"),
];

export const validateApplicationInfo = [
  // applicationId
  body("applicationId")
    .notEmpty()
    .withMessage("applicationId is required")
    .isString()
    .withMessage("applicationId must be a string"),

  // -------------------- Personal Info --------------------
  body("personalInfo").exists().withMessage("personalInfo is required"),

  body("personalInfo.title")
    .optional({ nullable: true })
    .isString()
    .withMessage("title must be a string"),

  body("personalInfo.sex")
    .optional({ nullable: true })
    .isIn(["MALE", "FEMALE", "OTHER"])
    .withMessage("sex must be one of: MALE, FEMALE, OTHER"),

  body("personalInfo.fistName")
    .notEmpty()
    .withMessage("fistName is required")
    .isString()
    .withMessage("fistName must be a string"),

  body("personalInfo.middleName")
    .optional({ nullable: true })
    .isString()
    .withMessage("middleName must be a string"),

  body("personalInfo.familyName")
    .notEmpty()
    .withMessage("familyName is required")
    .isString()
    .withMessage("familyName must be a string"),

  body("personalInfo.contactNo")
    .notEmpty()
    .withMessage("contactNo is required")
    .isMobilePhone("any")
    .withMessage("contactNo must be a valid phone number"),

  body("personalInfo.email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("personalInfo.nationality")
    .notEmpty()
    .withMessage("nationality is required")
    .isString()
    .withMessage("nationality must be a string"),

  body("personalInfo.otherNationality")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("otherNationality must be boolean"),

  body("personalInfo.nationalityBirth")
    .notEmpty()
    .withMessage("nationalityBirth is required")
    .isString()
    .withMessage("nationalityBirth must be a string"),

  body("personalInfo.cityBirth")
    .notEmpty()
    .withMessage("cityBirth is required")
    .isString()
    .withMessage("cityBirth must be a string"),

  body("personalInfo.birthDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("birthDate must be a valid ISO date"),

  body("personalInfo.maritalStatus")
    .optional({ nullable: true })
    .isIn([
      "SINGLE",
      "MARRIED",
      "COMMON_LAW_MARRIAGE",
      "CIVIL_UNION_DOMESTIC_PARTNERSHIP",
      "WIDOWED",
      "DIVORCED",
      "SEPARATED",
    ])
    .withMessage("Invalid maritalStatus"),

  body("personalInfo.anotherNationity")
    .optional({ nullable: true })
    .isString()
    .withMessage("anotherNationity must be a string"),

  // -------------------- Travel Document --------------------
  body("travelDocument").exists().withMessage("travelDocument is required"),

  body("travelDocument.type")
    .notEmpty()
    .withMessage("travelDocument.type is required")
    .isIn(["CERTIFICATE_OF_IDENTITY_CI", "PASSPORT", "SEAMANS_BOOK", "TRAVEL_DOCUMENT"])
    .withMessage("Invalid travelDocument type"),

  body("travelDocument.docsNumber")
    .notEmpty()
    .withMessage("docsNumber is required")
    .isString()
    .withMessage("docsNumber must be a string"),

  body("travelDocument.issuesPlace")
    .notEmpty()
    .withMessage("issuesPlace is required")
    .isString()
    .withMessage("issuesPlace must be a string"),

  body("travelDocument.issuesDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("issuesDate must be a valid date"),

  body("travelDocument.expiryDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("expiryDate must be a valid date"),

  // -------------------- Address --------------------
  body("address").exists().withMessage("address is required"),

  body("address.homeAddress")
    .notEmpty()
    .withMessage("homeAddress is required")
    .isString()
    .withMessage("homeAddress must be a string"),

  body("address.country")
    .notEmpty()
    .withMessage("country is required")
    .isString()
    .withMessage("country must be a string"),

  body("address.state")
    .notEmpty()
    .withMessage("state is required")
    .isString()
    .withMessage("state must be a string"),

  body("address.city")
    .notEmpty()
    .withMessage("city is required")
    .isString()
    .withMessage("city must be a string"),

  body("address.currentAddress")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("currentAddress must be boolean"),

  // -------------------- Employment --------------------
  body("employment").exists().withMessage("employment is required"),

  body("employment.occupation")
    .notEmpty()
    .withMessage("occupation is required")
    .isString()
    .withMessage("occupation must be a string"),

  body("employment.company")
    .optional({ nullable: true })
    .isString()
    .withMessage("company must be a string"),

  body("employment.annualIncome")
    .optional({ nullable: true })
    .isIn([
      "UNDER_20000_USD",
      "BETWEEN_20000_40000_USD",
      "BETWEEN_40001_60000_USD",
      "BETWEEN_60001_80000_USD",
      "MORE_THAN_AND_OVER",
      "NO_INCOME",
    ])
    .withMessage("Invalid annualIncome value"),
];
