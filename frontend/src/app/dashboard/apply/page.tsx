"use client";

import { useState, ChangeEvent, useEffect, DragEvent } from "react";
import { Box, Button, SelectChangeEvent, SwitchProps } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import axios from "axios";
import AuthProvider from "@/app/component/authProvider";
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
  SupportingDocumentInputDto,
} from "@/app/libs/types";
import ModalComponent from "@/app/component/common/modal";
import { transportationVehicle } from "@/app/libs/entries-input-visa";
import { backend_url } from "@/app/server-side/envLoader";
import { getUserInfo } from "@/app/libs/getLocalStorage";
import { getCountriesData } from "@/app/server-side/static-data";
import dayjs from "dayjs";

const prefix = backend_url + "api" + "/visa-application";

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

const MAX_SIZE = 3 * 1024 * 1024;

const ApplyNewVisa = () => {
  const [allCountries, setAllCountries] = useState();
  const [applicatioinId, setApplicationId] = useState<string>("");
  const [disabled, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepStatus, setStepStatus] = useState<Stepper>(steps[1]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "" });
  const [eligibilityData, setEligibilityData] = useState<EligibilityInputDto>({
    applicationId: null,
    applyAt: null,
    currentLocation: null,
    documentType: null,
    inputCountryPassport: null,
    numberOfEntries: null,
    visaType: null,
    visitPurpose: null,
  });
  const [applyInfoData, setApplyInfoData] = useState<ApplicationInformationInputDto>({
    applicationId: applicatioinId,
    title: "",
    sex: "",
    firstName: "",
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
    anotherNationality: "",

    // travelDocument
    documentType: "",
    documentNumber: "",
    issuesPlace: "",
    issuesDate: null,
    expiryDate: null,

    // address
    homeAddress: "",
    addressCountry: "",
    addressState: "",
    addressCity: "",
    currentAddress: false,

    // Employment
    annualIncome: "",
    occupation: "",
    company: "",
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
  const [supportingDoc, setSupportingDoc] = useState<SupportingDocumentInputDto>({
    biodata: null,
    photograph: null,
    currentLocation: null,
    bookingConfirmation: null,
    proofOfAccommodation: null,
    financialEvidence: null,
  });
  const [transVehicle, setTransVehicle] = useState<TransportationVehicleInputDto>({
    title: "Choose your transportation vehicle above",
    values: [],
    placeholder: "Choose your transportation vehicle first",
  });

  const { accessToken, id } = getUserInfo();

  useEffect(() => {
    (async () => {
      const countries = await getCountriesData();
      setAllCountries(countries);
    })();
  }, []);

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

  const handleOnCloseModal = () => {
    setModal(false);
    setModalContent({ title: "", description: "" });
  };

  // const handleOnchangeApplicationInformation = ({
  //   eSelect,
  //   eText,
  //   type,
  // }: {
  //   eSelect?: SelectChangeEvent | undefined;
  //   eText?: ChangeEvent<HTMLInputElement> | undefined;
  //   type: string;
  // }) => {

  // switch (type) {
  //   // PERSONAL INFORMATION
  //   case "title":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       title: eSelect?.target.value || "",
  //     }));
  //     break;
  //   case "firstName":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       fistName: eText?.target.value || "",
  //     }));
  //     break;
  //   case "familyName":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       familyName: eText?.target.value || "",
  //     }));
  //     break;
  //   case "middleName":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       middleName: eText?.target.value,
  //     }));
  //     break;
  //   case "sex":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       sex: eSelect?.target.value || "",
  //     }));
  //     break;
  //   case "contactNo":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       contactNo: eText?.target.value || "",
  //     }));
  //     break;
  //   case "anotherNationity":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       anotherNationity: eSelect?.target.value || "",
  //     }));
  //     break;
  //   case "nationalityBirth":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       nationalityBirth: eSelect?.target.value || "",
  //     }));
  //     break;
  //   case "anotherNationity":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       anotherNationity: eSelect?.target.value || "",
  //     }));
  //   case "annualIncome":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       annualIncome: eSelect?.target.value || "",
  //     }));
  //   case "cityAddress":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       addressCity: eSelect?.target.value || "",
  //     }));
  //   case "addressState":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       addressState: eSelect?.target.value || "",
  //     }));
  //   case "issuedPlace":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       issuedPlace: eText?.target.value || "",
  //     }));
  //   case "occupation":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       occupation: eSelect?.target.value || "",
  //     }));
  //   case "countryAddress":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       countryAddress: eText?.target.value || "",
  //     }));
  //     break;
  //   case "company":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       company: eText?.target.value || "",
  //     }));
  //     break;
  //   case "documentType":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       documentType: eSelect?.target.value || "",
  //     }));
  //   case "maritalStatus":
  //     setApplyInfoData((prev) => ({
  //       ...prev,
  //       maritalStatus: eSelect?.target.value || "",
  //     }));
  // }
  // };

  const handleOnchangeApplicationInformation = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    e.preventDefault();
    console.log(e.target.value, name);
    setApplyInfoData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handlePickDate = (value: Dayjs | null, name: string) => {
    const date = value?.toDate();
    setApplyInfoData((prev) => ({ ...prev, [name]: date }));
  };

  const handleChangeOtherNationality: NonNullable<SwitchProps["onChange"]> = (
    _e,
    checked
  ) => {
    setApplyInfoData((prev) => ({
      ...prev,
      otherNationality: checked,
    }));
  };

  const triggerNext = () => {
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

  const handleOnChangeInputFile = (e: ChangeEvent<HTMLInputElement>, typeDoc: string) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file.size > MAX_SIZE) {
        setModalContent({
          title: "Please choose file with size less than 3MB",
          description: "",
        });
        setModal(true);
        return;
      }
      switch (typeDoc) {
        case "biodata":
          setSupportingDoc((prev) => ({
            ...prev,
            biodata: file,
          }));
          break;
        case "photo":
          setSupportingDoc((prev) => ({
            ...prev,
            photograph: file,
          }));
          break;
        case "accomodationProof":
          setSupportingDoc((prev) => ({
            ...prev,
            proofOfAccommodation: file,
          }));
          break;
        case "financialEvidence":
          setSupportingDoc((prev) => ({
            ...prev,
            financialEvidence: file,
          }));
          break;
        case "travelBooking":
          setSupportingDoc((prev) => ({
            ...prev,
            bookingConfirmation: file,
          }));
          break;
        case "location":
          setSupportingDoc((prev) => ({
            ...prev,
            currentLocation: file,
          }));
          break;
      }
    }
  };

  const handleDropFile = (e: DragEvent<HTMLInputElement>, typeDoc: string) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setModalContent({
          title: "Please choose file with size less than 3MB",
          description: "",
        });
        setModal(true);
        return;
      }
      console.log(file);
      switch (typeDoc) {
        case "biodata":
          setSupportingDoc((prev) => ({
            ...prev,
            biodata: file,
          }));
          break;
        case "photo":
          setSupportingDoc((prev) => ({
            ...prev,
            photograph: file,
          }));
          break;
        case "accomodationProof":
          setSupportingDoc((prev) => ({
            ...prev,
            proofOfAccommodation: file,
          }));
          break;
        case "financialEvidence":
          setSupportingDoc((prev) => ({
            ...prev,
            financialEvidence: file,
          }));
          break;
        case "travelBooking":
          setSupportingDoc((prev) => ({
            ...prev,
            bookingConfirmation: file,
          }));
          break;
        case "location":
          setSupportingDoc((prev) => ({
            ...prev,
            currentLocation: file,
          }));
          break;
      }
    }
  };

  const handleSumbitEligibility = async () => {
    try {
      setLoading(true);
      setDisable(true);
      const endpoint = prefix + "/1st-eligibilty";
      const response = await axios.post(endpoint, eligibilityData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          userId: id,
        },
      });
      if (response.data.success === "OK") {
        setApplicationId(response.data.data.applicationId);
        setEligibilityData(response.data.data);
        setLoading(false);
        setDisable(false);
        triggerNext();
      }
    } catch (error: any) {
      console.log(error.response);
      setLoading(false);
      setDisable(false);
    }
  };

  const handleSubmitApplicationInformation = async () => {
    try {
      console.log(applyInfoData);
    } catch (error: any) {
      console.log(error.response.data.message);
      setLoading(false);
      setDisable(false);
    }
  };

  return (
    <AuthProvider>
      <Box sx={{ backgroundColor: "#F2FCFC", height: "100%", pb: 6 }}>
        <MenuDashboard />
        <form>
          <Box sx={{ width: "70%", m: "auto", mt: 4, mb: 6, height: "100%" }}>
            <HeaderTitleApplyStepper data={stepStatus} onClick={handleBackButton} />
            {stepStatus.activeStep === 0 && (
              <EligibilityStep
                disabled={disabled}
                loading={loading}
                onClickNext={handleSumbitEligibility}
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
                onclickNext={handleSubmitApplicationInformation}
                onClickBack={handleBackButton}
                countries={allCountries}
                dataProps={applyInfoData}
                onChangeBirthNation={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeDocumentType={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeMaritalStatus={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeFamilyName={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeFirstName={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeMiddletName={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeOtherNationality={handleChangeOtherNationality}
                onChangeSex={(e, name) => handleOnchangeApplicationInformation(e, name)}
                onChangeTitle={(e, name) => handleOnchangeApplicationInformation(e, name)}
                onChangeContactNo={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeAnotherNationality={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeAnnualIncome={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeCityAddress={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeStateAddress={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeIssuedPlace={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeExpiredDate={(value, name) => handlePickDate(value, name)}
                onChangeDocumentNo={(e) => handleOnchangeApplicationInformation(e, name)}
                onChangeIssuedDate={(value, name) => handlePickDate(value, name)}
                onChangeOccupation={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeBirthDate={(value, name) => handlePickDate(value, name)}
                onChangeCountryAddress={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
                }
                onChangeCompanyPlace={(e, name) =>
                  handleOnchangeApplicationInformation(e, name)
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
            {stepStatus.activeStep === 3 && (
              <SupportingDocument
                data={supportingDoc}
                onChangeFileBiodata={(e) => handleOnChangeInputFile(e, "biodata")}
                onChangeFileAccomodationProof={(e) =>
                  handleOnChangeInputFile(e, "accomodationProof")
                }
                onChangeFileFinancialEvidence={(e) =>
                  handleOnChangeInputFile(e, "financialEvidence")
                }
                onChangeFileLocation={(e) => handleOnChangeInputFile(e, "location")}
                onChangeFilePhoto={(e) => handleOnChangeInputFile(e, "photo")}
                onChangeFileTravelBooking={(e) =>
                  handleOnChangeInputFile(e, "travelBooking")
                }
                handleDropFileBioData={(e) => handleDropFile(e, "biodata")}
                handleDropFileAccomodationProof={(e) =>
                  handleDropFile(e, "accomodationProof")
                }
                handleDropFileFinancialEvidence={(e) =>
                  handleDropFile(e, "financialEvidence")
                }
                handleDropFileLocation={(e) => handleDropFile(e, "location")}
                handleDropFilePhoto={(e) => handleDropFile(e, "photo")}
                handleDropFileTravelBooking={(e) => handleDropFile(e, "travelBooking")}
              />
            )}
          </Box>
        </form>
        <ModalComponent
          open={modal}
          content={modalContent}
          onClose={handleOnCloseModal}
        />
      </Box>
    </AuthProvider>
  );
};

export default ApplyNewVisa;
