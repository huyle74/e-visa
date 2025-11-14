"use client";

import {
  useState,
  ChangeEvent,
  useEffect,
  DragEvent,
  MouseEventHandler,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  SelectChangeEvent,
  SwitchProps,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { Dayjs } from "dayjs";
import axios from "axios";
import { AuthProvider } from "@/app/contexts/authProvider";
import CountrySelectionStep from "@/app/component/apply/apply-stepper/select-country-fromTo";
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
  CountrySelectionDto,
} from "@/app/libs/types";
import PaypalButton from "@/app/component/paypal/paypalButton";
import { CountriesProvider } from "@/app/contexts/countriesContext";
import ModalComponent from "@/app/component/common/modal";
import { transportationVehicle } from "@/app/libs/entries-input-visa";
import { backend_url } from "@/app/server-side/envLoader";
import { getUserInfo } from "@/app/libs/getLocalStorage";
import Footer from "@/app/component/footer/footer";
import { reverseLabelToValue } from "@/app/libs/convertLabel";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

const prefix = backend_url + "api" + "/visa-application";

interface Stepper {
  activeStep: number;
  title: string;
}

const steps = [
  { activeStep: 0, title: "Select countries" },
  { activeStep: 1, title: "Check your eligibility" },
  { activeStep: 2, title: "Applicant Information" },
  { activeStep: 3, title: "Travel Information" },
  { activeStep: 4, title: "Supporting documents" },
  { activeStep: 5, title: "Payment" },
];

const MAX_SIZE = 5 * 1024 * 1024;

const ApplyNewVisa = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const user = getUserInfo();
  const search = useSearchParams();
  const applyId = search.get("applicationId");
  const applicationStatus = search.get("status");

  const router = useRouter();

  const [accessToken, setAccessToken] = useState(user?.accessToken);
  const [id, setId] = useState(user?.id);
  const [applicationId, setApplicationId] = useState<string | null>(applyId);
  const [disabled, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<Stepper>(steps[0]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [selectCountryData, setCountryData] = useState<CountrySelectionDto>({
    fromCountry: "",
    toCountry: "",
  });
  const [eligibilityData, setEligibilityData] = useState<EligibilityInputDto>({
    completed: false,
    applicationId: "",
    applyAt: "",
    currentLocation: "",
    documentType: "",
    inputCountryPassport: "",
    numberOfEntries: "",
    visaType: "",
    visitPurpose: "",
  });
  const [applyInfoData, setApplyInfoData] =
    useState<ApplicationInformationInputDto>({
      completed: false,
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

      // FILES
      biodata: null,
      photograph: null,
    });

  const [travelInfo, setTravelInfo] = useState<TravelInformationInputDto>({
    completed: false,
    arrivalDate: null,
    departureDate: null,
    country: "",
    arrivalPort: "",
    hadVisited: false,
    didApply: false,
    partOfTour: false,
    transportMode: "",
    shipName: "",
    fightNo: "",
    vehicleNumber: "",
    accommodations: [
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
  });
  const [supportingDoc, setSupportingDoc] =
    useState<SupportingDocumentInputDto>({
      completed: false,
      BIODATA: null,
      PHOTOGRAPH: null,
      CURRENT_LOCATION: null,
      BOOKING_CONFIRMATION: null,
      PROOF_OF_ACCOMMODATION: null,
      FINANCIAL_EVIDENCE: null,
    });
  const [transVehicle, setTransVehicle] =
    useState<TransportationVehicleInputDto>({
      title: "Choose your transportation vehicle above",
      values: [],
      placeholder: "Choose your transportation vehicle first",
    });
  const [getPrice, setGetPrice] = useState<string | number | undefined>(0);

  const getData = async (url: string, params: any = {}) => {
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { ...params, userId: id },
        }
      );
      if (response.data.success === "OK") {
        return response.data.data;
      } else return {};
    } catch (error: any) {
      setLoading(false);
      setDisable(false);
    }
  };

  useEffect(() => {
    if (applyId) {
      if (currentStep === 0) {
        const endpoint = prefix + "/find-visa-application";
        (async () => {
          const results = await getData(endpoint, { applicationId: applyId });
          if (results) setCountryData(results);
        })();
      }

      if (currentStep === 1 && !eligibilityData.completed) {
        const endpoint = prefix + "/find-eligibilty-form";
        (async () => {
          const eligibility = await getData(endpoint, {
            applicationId: applyId,
          });
          if (eligibility)
            return setEligibilityData({ ...eligibility, completed: true });
        })();
      }
      if (currentStep === 2 && !applyInfoData.completed) {
        const endpoint = prefix + "/find-application-information-form";
        (async () => {
          const applicationInformation = await getData(endpoint, {
            applicationId: applyId,
          });
          if (applicationInformation) {
            const { biodata, photograph, ...rest } = applicationInformation;

            if (biodata.data || photograph.data) {
              const biodataBlob = new File(
                [Uint8Array.from(atob(biodata.data), (c) => c.charCodeAt(0))],
                biodata.name,
                {
                  type: biodata.type,
                }
              );
              const photographBlob = new File(
                [
                  Uint8Array.from(atob(photograph.data), (c) =>
                    c.charCodeAt(0)
                  ),
                ],
                photograph.name,
                {
                  type: photograph.type,
                }
              );
              setApplyInfoData((prev) => ({
                ...prev,
                ...rest,
                biodata: biodataBlob,
                photograph: photographBlob,
                completed: true,
              }));
            } else {
              setApplyInfoData((prev) => ({
                ...prev,
                ...rest,
                biodata: null,
                photograph: null,
                completed: true,
              }));
            }
          }
        })();
      }

      if (currentStep === 3 && !travelInfo.completed) {
        (async () => {
          const endpoint = prefix + "/find-travel-information-form";
          const travelInformation = await getData(endpoint, {
            applicationId: applyId,
          });
          if (travelInformation)
            setTravelInfo({ ...travelInformation, completed: true });
        })();
      }

      if (currentStep === 4 && !supportingDoc.completed) {
        const endpoint = prefix + "/get-file-supporting-document";
        (async () => {
          try {
            const documents = [
              "BIODATA",
              "PHOTOGRAPH",
              "CURRENT_LOCATION",
              "BOOKING_CONFIRMATION",
              "PROOF_OF_ACCOMMODATION",
              "FINANCIAL_EVIDENCE",
            ];
            axios.all(
              documents.map(async (docs) => {
                const response = await axios.post(
                  endpoint,
                  {},
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    params: {
                      applicationId: applyId,
                      type: docs,
                    },
                    responseType: "blob",
                  }
                );
                const name = await response.headers["x-file-name"];
                const type = await response.headers["content-type"];
                const file = new File([response.data], name, { type });

                setSupportingDoc((prev) => ({ ...prev, [docs]: file }));
              })
            );
            setSupportingDoc((prev) => ({ ...prev, completed: true }));
            setLoading(false);
            setDisable(false);
          } catch (error: any) {
            setLoading(false);
            setDisable(false);
          }
        })();
      }
    }
  }, [currentStep]);

  const handleOnchangeEligibility = (e: SelectChangeEvent, name: string) => {
    e.preventDefault();
    setEligibilityData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleOnCloseModal = () => {
    setModal(false);
    setModalContent({ title: "", description: "", status: "" });
  };

  const handleOnchangeApplicationInformation = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    e.preventDefault();
    setApplyInfoData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handlePickDateApplicationInformation = (
    value: Dayjs | null,
    name: string
  ) => {
    const date = value?.toDate();
    setApplyInfoData((prev) => ({ ...prev, [name]: date }));
  };

  const handleChangeSwitchApplicationInformation: NonNullable<
    SwitchProps["onChange"]
  > = (e, checked) => {
    const name = e.target.name;
    setApplyInfoData((prev) => ({
      ...prev,
      [name]: checked,
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
    } else {
      router.push("/dashboard");
    }
  };

  const handleOnChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    console.log(name);
    if (files !== null) {
      const file = files[0];
      if (file.size > MAX_SIZE) {
        setModalContent({
          title: "Please choose file with size less than 3MB",
          description: "",
          status: "success",
        });
        setModal(true);
        return;
      } else {
        setSupportingDoc((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  const handleDropFile = (e: DragEvent<HTMLInputElement>, typeDoc: string) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setModalContent({
          title: "Please choose file with size less than 5MB",
          description: "",
          status: "error",
        });
        setModal(true);
        return;
      }
      setSupportingDoc((prev) => ({ ...prev, [typeDoc]: file }));
    }
  };

  const handleOnChangeTravelInformation = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setTravelInfo((prev) => ({ ...prev, [name]: e.target.value }));
    if (name == "arrivalPort") {
      const value = e.target.value as "Flight" | "Sea" | "Land";
      setTransVehicle(transportationVehicle[value]);
    }
  };

  const handelPickDateTravelInformation = (
    value: Dayjs | null,
    name: string
  ) => {
    const date = value?.toDate() || "";
    setTravelInfo((prev) => ({ ...prev, [name]: new Date(date) }));
  };

  const handelSwitchTravelInformation = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const checked = e.target.checked;
    setTravelInfo((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (name === "additionalAccommodation") {
      if (checked) {
        setTravelInfo((prev) => ({
          ...prev,
          accommodations: [
            ...prev.accommodations,
            {
              type: "",
              name: "",
              street: "",
              city: "",
              contactNo: "",
              duration: "",
            },
          ],
        }));
      } else {
        setTravelInfo((prev) => ({
          ...prev,
          accommodations: prev.accommodations.slice(0, -1),
        }));
      }
    }
  };

  const handleOnChangeAccommodationTravelInformation = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number = 0
  ) => {
    const { name, value } = e.target;
    console.log(name);
    setTravelInfo((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation, i) =>
        i === index ? { ...accommodation, [name]: value } : accommodation
      ),
    }));
  };

  const handleSubmitEligibility = async () => {
    try {
      if (eligibilityData.completed) return triggerNext();

      setLoading(true);
      setDisable(true);
      const endpoint = prefix + "/1st-eligibilty";

      const { visaType, visitPurpose, documentType, completed, ...rest } =
        eligibilityData;

      const data = {
        ...rest,
        ...selectCountryData,
        visaType: reverseLabelToValue(visaType),
        visitPurpose: reverseLabelToValue(visitPurpose),
        documentType: reverseLabelToValue(documentType),
        price: getPrice,
      };

      const response = await axios.post(endpoint, data, {
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
        router.push(`?applicationId=${response.data.data.applicationId}`, {
          scroll: false,
        });
        triggerNext();
      }
    } catch (error: any) {
      console.log(error.response);
      setLoading(false);
      setDisable(false);
    }
  };

  const handleSubmitApplicationInformation: MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();
    if (applyInfoData.completed) return triggerNext();

    try {
      const {
        sex,
        maritalStatus,
        documentType,
        annualIncome,
        occupation,
        ...rest
      } = applyInfoData;
      const convert = {
        ...rest,
        sex: reverseLabelToValue(sex),
        maritalStatus: reverseLabelToValue(maritalStatus),
        documentType: reverseLabelToValue(documentType),
        annualIncome: reverseLabelToValue(annualIncome),
        occupation: reverseLabelToValue(occupation),
      };
      const form = formConvertApplicationInformation(convert);
      setLoading(true);
      setDisable(true);
      const endpoint = prefix + "/2nd-applicationInformation";
      const response = await axios.post(endpoint, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          userId: id,
          applicationId,
          section: "application_information",
        },
      });
      if (response.data.success === "OK") {
        setLoading(false);
        setDisable(false);
        triggerNext();
      }
    } catch (error: any) {
      const message = error.response.data.message;
      console.log(message);
      setLoading(false);
      setDisable(false);
      setModalContent({
        title: "Please complete the required fields",
        status: "error",
        description:
          message.map((msg: string) => {
            return (
              <p key={msg}>
                {msg}
                <br></br>
              </p>
            );
          }) || "",
      });
      setModal(true);
    }
  };

  const handleDropFileApplicationInformation = (
    e: DragEvent<HTMLInputElement>,
    name: string
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setModalContent({
          title: "Please choose file with size less than 5MB",
          description: "",
          status: "error",
        });
        setModal(true);
        return;
      } else {
        setApplyInfoData((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  const handleOnchangeFilesApplicationInformation = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setModalContent({
          title: "Please choose file with size less than 5MB",
          description: "",
          status: "error",
        });
        setModal(true);
        return;
      } else {
        setApplyInfoData((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  const handleSubmitTravelInformation: MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();
    const { completed, ...data } = travelInfo;
    if (completed) return triggerNext();

    setLoading(true);
    setDisable(true);
    try {
      const endpoint = prefix + "/3rd-travelInformation";
      const response = await axios.post(
        endpoint,
        { applicationId, ...data },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { userId: id },
        }
      );
      if (response.data.success === "OK") {
        triggerNext();
        setLoading(false);
        setDisable(false);
      }
    } catch (error: any) {
      setLoading(false);
      setDisable(false);
    }
  };

  const handleSubmitSupportingDocument: MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();
    if (supportingDoc.completed) return triggerNext();

    setLoading(true);
    setDisable(true);
    try {
      const endpoint = prefix + "/4th-supportingDocument";

      if (!applicationId) return;
      const form = formConvertTravelInformation(supportingDoc);

      const response = await axios.post(endpoint, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { userId: id, applicationId, section: "supporting_document" },
      });
      if (response.data.success === "OK") {
        console.log(response.data);
        triggerNext();
        setLoading(false);
        setDisable(false);
      }
    } catch (error: any) {
      setLoading(false);
      setDisable(false);
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const handleOnchangeSelectCountriesForm = (
    e: SelectChangeEvent,
    name: string
  ) => {
    setCountryData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmitSelectCountriesForm: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    const { toCountry, fromCountry } = selectCountryData;
    if (toCountry.length !== 0 && fromCountry.length !== 0) {
      triggerNext();
    } else {
      setModal(true);
      setModalContent({
        title: "Please enter your route",
        description: "",
        status: "error",
      });
      return;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { toCountry, fromCountry } = selectCountryData;
        if (toCountry.length !== 0 && fromCountry.length !== 0) {
          setGetPrice(undefined);
          const endpoint = prefix + "/get-price";
          const { data } = await axios.post(
            endpoint,
            { from: fromCountry, to: toCountry },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setGetPrice(data?.data.totalPrice);
        } else return;
      } catch (error) {
        setGetPrice(0);
      }
    })();
  }, [selectCountryData]);

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const { toCountry, fromCountry } = selectCountryData;
      const endpoint = backend_url + "api/payment/create-order";
      const { data } = await axios(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          id: applicationId,
          price: getPrice,
          from: fromCountry,
          to: toCountry,
        },
      });

      return data.data.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    const endpoint = backend_url + "api/payment/capture-order";

    const response = await axios(endpoint, {
      method: "POST",
      data: { orderId: data.orderID, applicationId },
    });
    const status = response.data.data.status;
    if (status === "COMPLETED") {
      setModal(true);
      setModalContent({
        title: "Payment successfully",
        description: "",
        status: "success",
      });
      router.push("/dashboard");
    }
  };

  return (
    <AuthProvider>
      <Box
        sx={{
          backgroundColor: "#F2FCFC",
          height: matches ? "100vh" : "100%",
        }}
      >
        <MenuDashboard />
        <CountriesProvider>
          <form>
            <Box
              sx={{
                width: matches ? "95vw" : "70vw",
                m: "auto",
                mt: 4,
                pb: 6,
                height: "100%",
              }}
            >
              <HeaderTitleApplyStepper
                data={stepStatus}
                onClick={handleBackButton}
              />
              {stepStatus.activeStep === 0 && (
                <CountrySelectionStep
                  totalPrice={getPrice}
                  disabled={applyId ? true : disabled}
                  values={selectCountryData}
                  onChangeFromCountry={handleOnchangeSelectCountriesForm}
                  onChangeToCountry={handleOnchangeSelectCountriesForm}
                  loading={loading}
                  onclickNext={handleSubmitSelectCountriesForm}
                />
              )}
              {stepStatus.activeStep === 1 && (
                <EligibilityStep
                  disabled={eligibilityData.completed}
                  loading={loading}
                  onClickNext={handleSubmitEligibility}
                  valueProps={eligibilityData}
                  onChangeApplyAt={handleOnchangeEligibility}
                  onChangeCurrentLocation={handleOnchangeEligibility}
                  onChangeDocumentType={handleOnchangeEligibility}
                  onChangeInputCountryPassport={handleOnchangeEligibility}
                  onChangeNumberOfEntries={handleOnchangeEligibility}
                  onChangeVisaType={handleOnchangeEligibility}
                  onChangeVisitPurpose={handleOnchangeEligibility}
                  onClickBack={handleBackButton}
                />
              )}
              {stepStatus.activeStep === 2 && (
                <ApplicationInformation
                  dataProps={applyInfoData}
                  // HANDLE FILES
                  onChangeBiodata={handleOnchangeFilesApplicationInformation}
                  onChangePhotograph={handleOnchangeFilesApplicationInformation}
                  onDragBiodata={(e) =>
                    handleDropFileApplicationInformation(e, "biodata")
                  }
                  onDragPhotograph={(e) =>
                    handleDropFileApplicationInformation(e, "photograph")
                  }
                  //
                  onclickNext={handleSubmitApplicationInformation}
                  onClickBack={handleBackButton}
                  onChangeCityBirth={handleOnchangeApplicationInformation}
                  onChangeEmail={handleOnchangeApplicationInformation}
                  onChangeHomeAddress={handleOnchangeApplicationInformation}
                  onChangeNationality={handleOnchangeApplicationInformation}
                  onChangeBirthNation={handleOnchangeApplicationInformation}
                  onChangeDocumentType={handleOnchangeApplicationInformation}
                  onChangeMaritalStatus={handleOnchangeApplicationInformation}
                  onChangeFamilyName={handleOnchangeApplicationInformation}
                  onChangeFirstName={handleOnchangeApplicationInformation}
                  onChangeMiddleName={handleOnchangeApplicationInformation}
                  onChangeSwitch={handleChangeSwitchApplicationInformation}
                  onChangeSex={handleOnchangeApplicationInformation}
                  onChangeTitle={handleOnchangeApplicationInformation}
                  onChangeContactNo={handleOnchangeApplicationInformation}
                  onChangeAnotherNationality={
                    handleOnchangeApplicationInformation
                  }
                  onChangeAnnualIncome={handleOnchangeApplicationInformation}
                  onChangeCityAddress={handleOnchangeApplicationInformation}
                  onChangeStateAddress={handleOnchangeApplicationInformation}
                  onChangeIssuedPlace={handleOnchangeApplicationInformation}
                  onChangeExpiredDate={(value, name) =>
                    handlePickDateApplicationInformation(value, name)
                  }
                  onChangeDocumentNo={handleOnchangeApplicationInformation}
                  onChangeIssuedDate={(value, name) =>
                    handlePickDateApplicationInformation(value, name)
                  }
                  onChangeOccupation={handleOnchangeApplicationInformation}
                  onChangeBirthDate={(value, name) =>
                    handlePickDateApplicationInformation(value, name)
                  }
                  onChangeCountryAddress={handleOnchangeApplicationInformation}
                  onChangeCompanyPlace={handleOnchangeApplicationInformation}
                />
              )}
              {stepStatus.activeStep === 3 && (
                <TravelInformation
                  data={travelInfo}
                  onClickNext={handleSubmitTravelInformation}
                  onClickBack={handleBackButton}
                  onChangeArrivalPort={handleOnChangeTravelInformation}
                  vehicle={transVehicle}
                  onChangeAccommodationAddress={
                    handleOnChangeAccommodationTravelInformation
                  }
                  onChangeAccommodationDurationDay={
                    handleOnChangeAccommodationTravelInformation
                  }
                  onChangeAccommodationCity={
                    handleOnChangeAccommodationTravelInformation
                  }
                  onChangeAccommodationName={
                    handleOnChangeAccommodationTravelInformation
                  }
                  onChangeAccommodationPhone={
                    handleOnChangeAccommodationTravelInformation
                  }
                  onChangeAccommodationType={
                    handleOnChangeAccommodationTravelInformation
                  }
                  onChangeArrivalDate={handelPickDateTravelInformation}
                  onChangeDepartDate={handelPickDateTravelInformation}
                  onChangeHadVisit={handelSwitchTravelInformation}
                  onChangeDidApply={handelSwitchTravelInformation}
                  onChangePartOfTour={handelSwitchTravelInformation}
                  onChangeAdditionalAccomodation={handelSwitchTravelInformation}
                  onChangeSelectCountry={handleOnChangeTravelInformation}
                  onChangeTransportMode={handleOnChangeTravelInformation}
                  onChangeTransportVehicleCode={handleOnChangeTravelInformation}
                />
              )}
              {stepStatus.activeStep === 4 && (
                <SupportingDocument
                  onClickNext={handleSubmitSupportingDocument}
                  data={supportingDoc}
                  // Click
                  onChangeFileBiodata={handleOnChangeInputFile}
                  onChangeFileAccommodationProof={handleOnChangeInputFile}
                  onChangeFileFinancialEvidence={handleOnChangeInputFile}
                  onChangeFileLocation={handleOnChangeInputFile}
                  onChangeFilePhoto={handleOnChangeInputFile}
                  onChangeFileTravelBooking={handleOnChangeInputFile}
                  // DRAG
                  handleDropFileBioData={(e) => handleDropFile(e, "BIODATA")}
                  handleDropFileAccommodationProof={(e) =>
                    handleDropFile(e, "PROOF_OF_ACCOMMODATION")
                  }
                  handleDropFileFinancialEvidence={(e) =>
                    handleDropFile(e, "FINANCIAL_EVIDENCE")
                  }
                  handleDropFileLocation={(e) =>
                    handleDropFile(e, "CURRENT_LOCATION")
                  }
                  handleDropFilePhoto={(e) => handleDropFile(e, "PHOTOGRAPH")}
                  handleDropFileTravelBooking={(e) =>
                    handleDropFile(e, "BOOKING_CONFIRMATION")
                  }
                  loading={loading}
                />
              )}
              {stepStatus.activeStep === 5 && (
                <Box sx={{ justifyItems: "center", mt: 7 }}>
                  <PaypalButton
                    didPayed={String(applicationStatus)}
                    price={getPrice}
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                </Box>
              )}
            </Box>
          </form>
        </CountriesProvider>
        <ModalComponent
          open={modal}
          content={modalContent}
          onClose={handleOnCloseModal}
        />
        <Footer />
      </Box>
    </AuthProvider>
  );
};

export default ApplyNewVisa;

const formConvertApplicationInformation = (
  data: ApplicationInformationInputDto
) => {
  const form = new FormData();
  const { biodata, photograph, completed, ...rest } = data;

  Object.entries(rest).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    form.append(k, String(v));
  });
  if (biodata) form.append("biodata", biodata);
  if (photograph) form.append("photograph", photograph);

  return form;
};

const formConvertTravelInformation = (data: SupportingDocumentInputDto) => {
  const { completed, ...rest } = data;
  const form = new FormData();

  Object.entries(rest).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    form.append(k, v);
  });

  return form;
};
