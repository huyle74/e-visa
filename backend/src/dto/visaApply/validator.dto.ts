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

export const applicationInformationValidator = [
  body("applicationId").notEmpty().withMessage("applicationId is required"),

  body("title").notEmpty().withMessage("Title is required"),

  body("sex").notEmpty().withMessage("SEX is required"),

  body("firstName").isString().trim().notEmpty().withMessage("First name is required"),

  body("middleName")
    .optional({ nullable: true })
    .isString()
    .withMessage("middleName must be a string"),

  body("familyName").isString().trim().notEmpty().withMessage("Family Name is required"),

  body("contactNo")
    .isString()
    .matches(/^\+?[0-9\- ]+$/)
    .withMessage("Phone number is required"),

  body("email").isEmail().withMessage("Email must be a valid email"),

  // CHECK files

  body("nationality").notEmpty().withMessage("Nationality is required"),

  body("otherNationality")
    .isBoolean()
    .withMessage("otherNationality must be true or false"),

  body("nationalityBirth").notEmpty().withMessage("Birth Nationality is required"),

  body("cityBirth").isString().notEmpty().withMessage("Birth City is required"),

  body("birthDate").notEmpty().withMessage("Date of Birth is required"),

  body("maritalStatus").notEmpty().withMessage("Marital Status must be filled"),

  body("anotherNationality")
    .optional({ nullable: true })
    .isString()
    .withMessage("anotherNationality must be a string"),

  body("documentType").notEmpty().withMessage("Document type is required"),

  body("documentNumber")
    .isString()
    .notEmpty()
    .withMessage("Number of documentNumber is required"),

  body("issuesPlace").isString().notEmpty().withMessage("Place issues is required"),

  body("issuesDate").notEmpty().withMessage("Issues Date is required"),

  body("expiryDate").notEmpty().withMessage("Expiry Date is required"),

  body("homeAddress").isString().notEmpty().withMessage("Home Address is required"),

  body("addressCountry").notEmpty().withMessage("Address Country is required"),

  body("addressState").isString().notEmpty().withMessage("Address State is required"),

  body("addressCity").isString().notEmpty().withMessage("Address City is required"),

  body("currentAddress").isBoolean().withMessage("Current Address must be true or false"),

  body("occupation").isString().notEmpty().withMessage("Occupation is required"),

  body("company").isString().notEmpty().withMessage("Company is required"),

  body("annualIncome")
    .isIn([
      "BELOW_20000_USD",
      "BETWEEN_20001_40000_USD",
      "BETWEEN_40001_60000_USD",
      "BETWEEN_60001_80000_USD",
      "ABOVE_80001_USD",
    ])
    .withMessage("annualIncome must be a valid range"),
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
  body("CURRENT_LOCATION").custom((_, { req }) =>
    checkExceedSize("CURRENT_LOCATION", req)
  ),
  body("BOOKING_CONFIRMATION").custom((_, { req }) =>
    checkExceedSize("BOOKING_CONFIRMATION", req)
  ),
  body("PROOF_OF_ACCOMMODATION").custom((_, { req }) =>
    checkExceedSize("PROOF_OF_ACCOMMODATION", req)
  ),
  body("FINANCIAL_EVIDENCE").custom((_, { req }) =>
    checkExceedSize("FINANCIAL_EVIDENCE", req)
  ),
];
const MAX_MB = 1024 * 1024 * 5;
const ALLOWED = ["image/jpeg", "image/png", "application/pdf"];
function checkExceedSize(field: string, req: any) {
  console.log(field, req.body);
  const file = req.files[field]?.[0];

  if (!file) throw new Error(`${field} is required!`);
  if (file.size > MAX_MB) throw new Error(`${field} size exceeds 5MB`);
  if (!ALLOWED.includes(file.mimeType) === false)
    throw new Error(`${field} has invalid type: ${file.mimetype}`);

  return true;
}
