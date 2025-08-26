import { body } from "express-validator";
import type { Request } from "express";

export const eligibiltyValidator = [
  body("applyAt").notEmpty().withMessage("Apply place is required"),
  body("currentLocation").notEmpty().withMessage("Current location is required"),
  body("documentType").notEmpty().withMessage("Document type is required"),
  body("inputCountryPassport").notEmpty().withMessage("inputCountryPassport is required"),
  body("numberOfEntries").notEmpty().withMessage("Entries number is required"),
  body("visaType").notEmpty().withMessage("Visa type is required"),
  body("visitPurpose").notEmpty().withMessage("Visit Purpose is required"),
];

export const applicationInformationValidator = [
  body("applicationId").isUUID().withMessage("applicationId must be a valid UUID"),

  body("title")
    .isIn(["MR", "MRS", "MS", "MISS"])
    .withMessage("title must be one of MR, MRS, MS, MISS"),

  body("sex")
    .isIn(["MALE", "FEMALE", "OTHER"])
    .withMessage("sex must be MALE, FEMALE or OTHER"),

  body("firstName").isString().trim().notEmpty().withMessage("firstName is required"),

  body("middleName")
    .optional({ nullable: true })
    .isString()
    .withMessage("middleName must be a string"),

  body("familyName").isString().trim().notEmpty().withMessage("familyName is required"),

  body("contactNo")
    .isString()
    .matches(/^\+?[0-9\- ]+$/)
    .withMessage("contactNo must be a valid phone number"),

  body("email").isEmail().withMessage("email must be a valid email"),

  body("nationality")
    .isISO31661Alpha2()
    .withMessage("nationality must be a valid ISO 2 country code"),

  body("otherNationality")
    .isBoolean()
    .withMessage("otherNationality must be true or false"),

  body("nationalityBirth")
    .isISO31661Alpha2()
    .withMessage("nationalityBirth must be a valid ISO 2 country code"),

  body("cityBirth").isString().notEmpty().withMessage("cityBirth is required"),

  body("birthDate")
    .isISO8601()
    .toDate()
    .withMessage("birthDate must be a valid ISO date"),

  body("maritalStatus")
    .isIn(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"])
    .withMessage("maritalStatus must be one of SINGLE, MARRIED, DIVORCED, WIDOWED"),

  body("anotherNationality")
    .optional({ nullable: true })
    .isString()
    .withMessage("anotherNationality must be a string"),

  body("documentType")
    .isIn(["PASSPORT", "ID_CARD", "TRAVEL_DOCUMENT"])
    .withMessage("documentType must be PASSPORT, ID_CARD or TRAVEL_DOCUMENT"),

  body("documentNumber").isString().notEmpty().withMessage("documentNumber is required"),

  body("issuesPlace").isString().notEmpty().withMessage("issuesPlace is required"),

  body("issuesDate").isISO8601().toDate().withMessage("issuesDate must be a valid date"),

  body("expiryDate").isISO8601().toDate().withMessage("expiryDate must be a valid date"),

  body("homeAddress").isString().notEmpty().withMessage("homeAddress is required"),

  body("addressCountry")
    .isISO31661Alpha2()
    .withMessage("addressCountry must be a valid ISO 2 country code"),

  body("addressState").isString().notEmpty().withMessage("addressState is required"),

  body("addressCity").isString().notEmpty().withMessage("addressCity is required"),

  body("currentAddress").isBoolean().withMessage("currentAddress must be true or false"),

  body("occupation").isString().notEmpty().withMessage("occupation is required"),

  body("company").isString().notEmpty().withMessage("company is required"),

  body("annualIncome")
    .isIn([
      "BELOW_20000_USD",
      "BETWEEN_20001_40000_USD",
      "BETWEEN_40001_60000_USD",
      "BETWEEN_60001_80000_USD",
      "ABOVE_80001_USD",
    ])
    .withMessage("annualIncome must be a valid range"),

  body("userIdApplied").isUUID().withMessage("userIdApplied must be a valid UUID"),
];

export const travelInformationValidator = [
  body("applicationId")
    .notEmpty()
    .withMessage("applicationId is required")
    .isString()
    .withMessage("applicationId must be a string"),

  body("arrivalDate")
    .notEmpty()
    .withMessage("arrivalDate is required")
    .isISO8601()
    .toDate()
    .withMessage("arrivalDate must be a valid date"),

  body("departureDate")
    .notEmpty()
    .withMessage("departureDate is required")
    .isISO8601()
    .toDate()
    .withMessage("departureDate must be a valid date"),

  body("country")
    .notEmpty()
    .withMessage("country is required")
    .isString()
    .withMessage("country must be a string"),

  body("arrivalPort")
    .notEmpty()
    .withMessage("arrivalPort is required")
    .isString()
    .withMessage("arrivalPort must be a string"),

  body("hadVisited").isBoolean().withMessage("hadVisited must be a boolean"),

  body("didApply").isBoolean().withMessage("didApply must be a boolean"),

  body("partOfTour").isBoolean().withMessage("partOfTour must be a boolean"),

  body("transportationVehicle")
    .notEmpty()
    .withMessage("transportationVehicle is required")
    .isString()
    .withMessage("transportationVehicle must be a string"),

  ,
  body("transportMode")
    .notEmpty()
    .withMessage("transportMode is required")
    .isString()
    .withMessage("transportMode must be a string"),

  body("shipName").optional().isString().withMessage("shipName must be a string"),

  body("fightNo").optional().isString().withMessage("fightNo must be a string"),

  body("vehicleNumber")
    .optional()
    .isString()
    .withMessage("vehicleNumber must be a string"),

  body("accommodations")
    .isArray({ min: 1 })
    .withMessage("accommodations must be an array"),

  body("accommodations.*.type")
    .notEmpty()
    .withMessage("accommodation type is required")
    .isString()
    .withMessage("accommodation type must be a string"),

  body("accommodations.*.name")
    .notEmpty()
    .withMessage("accommodation name is required")
    .isString()
    .withMessage("accommodation name must be a string"),

  body("accommodations.*.street")
    .notEmpty()
    .withMessage("accommodation street is required")
    .isString()
    .withMessage("accommodation street must be a string"),

  body("accommodations.*.city")
    .notEmpty()
    .withMessage("accommodation city is required")
    .isString()
    .withMessage("accommodation city must be a string"),

  body("accommodations.*.contactNo")
    .notEmpty()
    .withMessage("accommodation contactNo is required")
    .isString()
    .withMessage("accommodation contactNo must be a string"),

  body("accommodations.*.duration")
    .notEmpty()
    .withMessage("accommodation duration is required")
    .isString()
    .withMessage("accommodation duration must be a string"),

  body("additionalAccommodation")
    .isBoolean()
    .withMessage("additionalAccommodation must be a boolean"),
];

export const supportingDocumentValidator = [
  body("BIODATA").custom((_, { req }) => checkExceedSize("BIODATA", req)),
  body("PHOTOGRAPH").custom((_, { req }) => checkExceedSize("PHOTOGRAPH", req)),
  ,
  body("CURRENT_LOCATION").custom((_, { req }) =>
    checkExceedSize("CURRENT_LOCATION", req)
  ),
  ,
  body("BOOKING_CONFIRMATION").custom((_, { req }) =>
    checkExceedSize("BOOKING_CONFIRMATION", req)
  ),
  ,
  body("PROOF_OF_ACCOMMODATION").custom((_, { req }) =>
    checkExceedSize("PROOF_OF_ACCOMMODATION", req)
  ),
  ,
  body("FINANCIAL_EVIDENCE").custom((_, { req }) =>
    checkExceedSize("FINANCIAL_EVIDENCE", req)
  ),
  ,
];
const MAX_MB = 1024 * 1024 * 3;
const ALLOWED = ["image/jpeg", "image/png", "application/pdf"];
function checkExceedSize(field: string, req: any) {
  const file = req.files[field]?.[0];

  if (!file) throw new Error(`${field} is required!`);
  if (file.size > MAX_MB) throw new Error(`${field} size exceeds 3MB`);
  if (!ALLOWED.includes(file.mimeType) === false)
    throw new Error(`${field} has invalid type: ${file.mimetype}`);

  return true;
}
