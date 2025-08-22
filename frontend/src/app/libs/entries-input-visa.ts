import { countries } from "../static/countries";

const nationArr = countries.map((country) => {
  return country.engName;
});

export const eligibilityEntries = {
  applyAt: ["USA", "China", "Thailand"],
  currentLocation: ["Vietnam", "Cambodia", "Isarel", "UAE"],
  documentType: [
    "Ordinary Passport / Travel Document",
    "Diplomatic passport",
    "Official passport / Service passport",
    "Public Affair",
  ],
  inputCountryPassport: ["Vietnam", "Cambodia", "Isarel", "UAE"],
  numberOfEntries: ["2", "3"],
  visaType: [
    "Tourist Visa",
    "Transit Visa",
    "Non-Immigrant Visa",
    "SMART Visa",
    "Courtesy Visa",
    "LTR (Long Term Resident) Visa",
    "DTV (Destination Thailand Visa)",
    "Thailand Privilege Card",
  ],
  visitPurpose: ["Visit Familiy", "Travel", "For Work"],
};

export const applicationInformationEntries = {
  personalInfo: {
    title: ["Mr", "Miss", "Mrs", "Master", "Other"],
    sex: ["Male", "Female", "Others"],
    nationality: nationArr,
    nationalityBirth: nationArr,
    maritalStatus: [
      "Single",
      "Married",
      "Common Law Marriage",
      "Civil Union/Domestic Partnership",
      "Widowed",
      "Divorced",
      "Separated",
    ],
  },
  travelDocument: {
    type: ["Certificate of Identity-C.I", "Passport", "Seaman's Book", "Travel Document"],
    country: nationArr,
    state: [],
    city: [],
  },
  employment: {
    occupation: [
      "Business Owner",
      "Employee",
      "Freelance",
      "Government Official",
      "Retired",
      "Student",
      "Unemployed",
      "Other",
    ],
    annualIncome: [
      "Under 20,000 US$",
      "20,000 - 40,000 US$",
      "40,001 - 60,000 US$",
      "60,001 - 80,000 US$",
      "80,001 and Over",
      "No Income",
    ],
  },
};

export const transportationVehicle = {
  sea: {
    title: "Name",
    values: ["Cruise", "Commercial Vessel", "Ferry", "Private Craft"],
    placeholder: "Enter your Vessel Name",
  },
  land: {
    title: "Vehicle Number",
    values: ["Bus", "Car", "Lorry", "Motocycle", "Rail", "Van"],
    placeholder: "Enter your Vehicle Number",
  },
  flight: {
    title: "Flight No.",
    values: ["Charter (Private)", "Schedule (Commercial)"],
    placeholder: "Enter your flight number",
  },
};

export const travelInformationEntries = {
  travelInfo: {
    country: nationArr,
    arrivalPort: ["Land", "Sea", "Air"],
    hadVisited: false,
    didApply: false,
    partOfTour: false,
  },
  Accommodation: {
    AccommodationInfo: [],
    additionalAccommodation: false,
    accommodationType: ["Hotel", "Private Property", "Own Property"],
  },
};
