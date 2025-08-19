"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Box, Button, SelectChangeEvent, SwitchProps } from "@mui/material";
import ApplicationInformation from "@/app/component/apply/apply-stepper/applyInformation";
import TravelInformation from "@/app/component/apply/apply-stepper/travel-information";
import EligibilityStep from "@/app/component/apply/apply-stepper/eligibility";
import SupportingDocument from "@/app/component/apply/apply-stepper/supporting-document";
import HeaderTitleApplyStepper from "@/app/component/apply/apply-stepper/header-title";
import MenuDashboard from "@/app/component/menu/header-menu-dashboard";
import {
  EligibilityInputDto,
  ApplicationInformationInputDto,
  TravelInformationInputDto,
  TransportationVehicleInputDto,
} from "@/app/libs/types";
import { transportationVehicle } from "@/app/libs/entries-input-visa";

interface Stepper {
  activeStep: number;
  title: string;
}

const steps = [
  { activeStep: 0, title: "Check your eligibility" },
  { activeStep: 1, title: "Applicant Information" },
  { activeStep: 2, title: "Travel Information" },
  { activeStep: 3, title: "Supporting documents" },
  { activeStep: 4, title: "Payment" },
];

const ApplyNewVisa = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepStatus, setStepStatus] = useState<Stepper>(steps[0]);
  const [eligibilityData, setEligibilityData] = useState<EligibilityInputDto>({
    applyAt: "",
    currentLocation: "",
    documentType: "",
    inputCountryPassport: "",
    numberOfEntries: "",
    visaType: "",
    visitPurpose: "",
  });
  const [applyInfoData, setApplyInfoData] = useState<ApplicationInformationInputDto>({
    personalInfo: {
      title: "",
      sex: "",
      fistName: "",
      middleName: "",
      familyName: "",
      contactNo: "",
      email: "",
      nationality: "",
      otherNationality: false,
      nationalityBirth: "",
      cityBirth: "",
      birthDate: null,
      maritalStatus: "",
      anotherNationity: "",
    },
    travelDocument: {
      type: "",
      docsNumber: "",
      issuesPlace: "",
      issuesDate: null,
      expiryDate: null,
    },
    address: {
      homeAddress: "",
      country: "",
      state: "",
      city: "",
      currentAddress: true,
    },
    employment: {
      occupation: "",
      company: "",
      annualIncome: "",
    },
  });
  const [travelInfo, setTravelInfo] = useState<TravelInformationInputDto>({
    travelInfo: {
      arrivalDate: null,
      departureDate: null,
      country: "",
      arrivalPort: "",
      hadVisited: false,
      didApply: false,
      partOfTour: false,
      transportMode: "",
      transportationVehicle: "",
    },
    Accommodation: {
      AccommodationInfo: [
        {
          type: "",
          name: "",
          street: "",
          city: "",
          contactNo: "",
          duration: "",
        },
      ],
      additionalAccommodation: false,
    },
  });
  const [transVehicle, setTransVehicle] = useState<TransportationVehicleInputDto>({
    title: "Choose your transportation vehicle above",
    values: [],
    placeholder: "Choose your transportation vehicle first",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    // console.log(eligibilityData);
  };

  const handleOnchangeEligibility = (e: SelectChangeEvent, type: string) => {
    e.preventDefault();
    switch (type) {
      case "applyAt":
        setEligibilityData((prev) => ({ ...prev, applyAt: e.target.value }));
        break;
      case "documentType":
        setEligibilityData((prev) => ({ ...prev, documentType: e.target.value }));
        break;
      case "currentLocation":
        setEligibilityData((prev) => ({ ...prev, currentLocation: e.target.value }));
        break;
      case "inputCountryPassport":
        setEligibilityData((prev) => ({ ...prev, inputCountryPassport: e.target.value }));
        break;
      case "visitPurpose":
        setEligibilityData((prev) => ({ ...prev, visitPurpose: e.target.value }));
        break;
      case "numberOfEntries":
        setEligibilityData((prev) => ({ ...prev, numberOfEntries: e.target.value }));
        break;
      case "visaType":
        setEligibilityData((prev) => ({ ...prev, visaType: e.target.value }));
        break;
    }
  };

  useEffect(() => {
    console.log(applyInfoData);
  }, [applyInfoData]);

  const handleOnchangeApplicationInformation = (
    eSelect: SelectChangeEvent | undefined,
    eText: ChangeEvent<HTMLInputElement> | undefined,
    type: string
  ) => {
    switch (type) {
      // PERSONAL INFORMATION
      case "title":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: { ...prev["personalInfo"], title: eSelect?.target.value || "" },
        }));
        break;
      case "firstName":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: { ...prev["personalInfo"], fistName: eText?.target.value || "" },
        }));
        break;
      case "familyName":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev["personalInfo"],
            familyName: eText?.target.value || "",
          },
        }));
        break;
      case "middleName":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: { ...prev["personalInfo"], middleName: eText?.target.value },
        }));
        break;
      case "sex":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: { ...prev["personalInfo"], sex: eSelect?.target.value || "" },
        }));
        break;
      case "contactNo":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: { ...prev["personalInfo"], contactNo: eText?.target.value || "" },
        }));
        break;
      case "anotherNationity":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev["personalInfo"],
            anotherNationity: eSelect?.target.value || "",
          },
        }));
        break;
      case "nationalityBirth":
        setApplyInfoData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev["personalInfo"],
            nationalityBirth: eSelect?.target.value || "",
          },
        }));
        break;
    }
  };

  const handleChangeOtherNationality: NonNullable<SwitchProps["onChange"]> = (
    _e,
    checked
  ) => {
    setApplyInfoData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev["personalInfo"],
        otherNationality: checked,
      },
    }));
  };

  const handleNextButton = () => {
    if (stepStatus.activeStep > steps.length - 1) return;
    setCurrentStep((prev) => prev + 1);
    setStepStatus((pre) => steps[pre.activeStep + 1]);
  };

  const handleBackButton = () => {
    if (stepStatus.activeStep !== 0) {
      setStepStatus((pre) => steps[pre.activeStep - 1]);
    }
  };

  const handleOnChangeDepartPort = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const vehicle = e.target.value;
    setTravelInfo((prev) => ({
      ...prev,
      travelInfo: { ...prev["travelInfo"], transportationVehicle: vehicle },
    }));
    switch (vehicle) {
      case "Sea":
        setTransVehicle(transportationVehicle.sea);
        break;
      case "Flight":
        setTransVehicle(transportationVehicle.flight);
        break;
      case "Land":
        setTransVehicle(transportationVehicle.land);
        break;
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F2FCFC", height: "100%", pb: 6 }}>
      <MenuDashboard />
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: "70%", m: "auto", mt: 4, mb: 6, height: "100%" }}>
          <HeaderTitleApplyStepper data={stepStatus} onClick={handleBackButton} />
          {stepStatus.activeStep === 0 && (
            <EligibilityStep
              valueProps={eligibilityData}
              onChangeApplyAt={(e) => handleOnchangeEligibility(e, "applyAt")}
              onChangeCurrentLocation={(e) =>
                handleOnchangeEligibility(e, "currentLocation")
              }
              onChangeDocumentType={(e) => handleOnchangeEligibility(e, "documentType")}
              onChangeInpurtCountryPassport={(e) =>
                handleOnchangeEligibility(e, "inputCountryPassport")
              }
              onChangeNumberOfEntries={(e) =>
                handleOnchangeEligibility(e, "numberOfEntries")
              }
              onChangeVisaType={(e) => handleOnchangeEligibility(e, "visaType")}
              onChangeVisitPurpose={(e) => handleOnchangeEligibility(e, "visitPurpose")}
            />
          )}
          {stepStatus.activeStep === 1 && (
            <ApplicationInformation
              dataProps={applyInfoData}
              onChangeBirthNation={(e) =>
                handleOnchangeApplicationInformation(e, undefined, "nationalityBirth")
              }
              onChangeFamilyName={(e) =>
                handleOnchangeApplicationInformation(undefined, e, "familyName")
              }
              onChangeFirstName={(e) =>
                handleOnchangeApplicationInformation(undefined, e, "firstName")
              }
              onChangeMiddletName={(e) =>
                handleOnchangeApplicationInformation(undefined, e, "middleName")
              }
              onChangeOtherNationality={handleChangeOtherNationality}
              onChangeSex={(e) =>
                handleOnchangeApplicationInformation(e, undefined, "sex")
              }
              onChangeTitle={(e) =>
                handleOnchangeApplicationInformation(e, undefined, "title")
              }
              onChangeContactNo={(e) =>
                handleOnchangeApplicationInformation(undefined, e, "contactNo")
              }
              onChangeAnotherNationality={(e) =>
                handleOnchangeApplicationInformation(e, undefined, "anotherNationity")
              }
            />
          )}
          {stepStatus.activeStep === 2 && (
            <TravelInformation
              data={travelInfo}
              onChangeDepartPort={handleOnChangeDepartPort}
              vehicle={transVehicle}
            />
          )}
          {stepStatus.activeStep === 3 && <SupportingDocument />}
          <Button
            type="submit"
            variant="contained"
            sx={{ p: 1, width: "100px", mt: 2, float: "right" }}
            onClick={handleNextButton}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ApplyNewVisa;
