"use client";

import ApplicationInformation from "@/app/component/apply/apply-stepper/applyInformation";
import EligibilityStep from "@/app/component/apply/apply-stepper/eligibility";
import HeaderTitleApplyStepper from "@/app/component/apply/apply-stepper/header-title";
import MenuDashboard from "@/app/component/menu/header-menu-dashboard";
import { EligibilityInput } from "@/app/libs/types";
import { Box, Button, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

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
  const [eligibilityData, setEligibilityData] = useState<EligibilityInput>({
    applyAt: "",
    currentLocation: "",
    documentType: "",
    inputCountryPassport: "",
    numberOfEntries: "",
    visaType: "",
    visitPurpose: "",
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

  const handleNextButton = () => {
    if (stepStatus.activeStep > steps.length - 1) return;
    console.log(stepStatus.activeStep);
    setCurrentStep((prev) => prev + 1);
    setStepStatus((pre) => steps[pre.activeStep + 1]);
  };

  const handleBackButton = () => {
    if (stepStatus.activeStep !== 0) {
      setStepStatus((pre) => steps[pre.activeStep - 1]);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F2FCFC", height: "100%", pb: 6 }}>
      <MenuDashboard />
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ width: "70%", m: "auto", mt: 4, mb: 6, border: "2px red solid", height: "100%" }}>
          <HeaderTitleApplyStepper data={stepStatus} onClick={handleBackButton} />
          {stepStatus.activeStep === 0 && (
            <EligibilityStep
              valueProps={eligibilityData}
              onChangeApplyAt={(e) => handleOnchangeEligibility(e, "applyAt")}
              onChangeCurrentLocation={(e) => handleOnchangeEligibility(e, "currentLocation")}
              onChangeDocumentType={(e) => handleOnchangeEligibility(e, "documentType")}
              onChangeInpurtCountryPassport={(e) => handleOnchangeEligibility(e, "inputCountryPassport")}
              onChangeNumberOfEntries={(e) => handleOnchangeEligibility(e, "numberOfEntries")}
              onChangeVisaType={(e) => handleOnchangeEligibility(e, "visaType")}
              onChangeVisitPurpose={(e) => handleOnchangeEligibility(e, "visitPurpose")}
            />
          )}
          {stepStatus.activeStep === 1 && <ApplicationInformation />}
          <Button
            type="submit"
            variant="contained"
            sx={{ p: 1, width: "100px", mt: 2, float: "right" }}
            onClick={handleNextButton}>
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ApplyNewVisa;
