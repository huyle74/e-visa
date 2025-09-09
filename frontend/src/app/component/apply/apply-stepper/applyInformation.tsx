import {
  ReactNode,
  ChangeEvent,
  useEffect,
  useState,
  DragEvent,
  MouseEventHandler,
} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Paper,
  styled,
  SelectChangeEvent,
  Switch,
  SwitchProps,
} from "@mui/material";
import Image from "next/image";
import { getStatesData, getCitiesData } from "@/app/server-side/static-data";
import { Dayjs } from "dayjs";
import FormContainer from "../containerForm";
import AutoCompleteForm from "../autocompleteForm";
import { ApplicationInformationInputDto } from "@/app/libs/types";
import TextFieldApply from "../textField";
import MobileTextField from "../mobileInput";
import DatePickerComponent from "../date-picker";
import InputContainer from "../input-containter";
import ButtonSumbit from "../button-submit-group";
import { getApplicationInfoEnum } from "@/app/server-side/static-data";

type E = SelectChangeEvent;
type PickDate = (newValue: Dayjs | null, name: string) => void;
type Text = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  name: string
) => void;
type DropFile = (e: DragEvent<HTMLInputElement>) => void;

interface ApplicationInforProps {
  dataProps: ApplicationInformationInputDto;
  onChangeTitle: (e: E, name: string) => void;
  onChangeSex: (e: E, name: string) => void;
  onChangeFirstName: Text;
  onChangeMiddletName: Text;
  onChangeFamilyName: Text;
  onChangeBirthNation: (e: E, name: string) => void;
  onChangeOtherNationality: NonNullable<SwitchProps["onChange"]>;
  onChangeAnotherNationality: (e: E, name: string) => void;
  onChangeContactNo: Text;
  onChangeDocumentNo: Text;
  onChangeIssuedPlace: Text;
  onChangeMaritalStatus: (e: E, name: string) => void;
  onChangeDocumentType: (e: E, name: string) => void;
  onChangeNationality: (e: E, name: string) => void;

  onChangeEmail: Text;
  onChangeCityBirth: Text;
  onChangeHomeAddress: Text;

  onChangeIssuedDate: PickDate;
  onChangeBirthDate: PickDate;
  onChangeExpiredDate: PickDate;

  onChangeCountryAddress: (e: E, name: string) => void;
  onChangeStateAddress: (e: E, name: string) => void;
  onChangeCityAddress: (e: E, name: string) => void;
  onChangeOccupation: (e: E, name: string) => void;
  onChangeCompanyPlace: Text;
  onChangeAnnualIncome: (e: E, name: string) => void;

  onclickNext: MouseEventHandler<HTMLButtonElement>;
  onClickBack: () => void;
  countries: any;

  // FILES
  onChangeBiodata: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  onChangePhotograph: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  onDragBiodata: DropFile;
  onDragPhotograph: DropFile;
}

const ApplicationInformation = ({
  dataProps,
  onChangeSex,
  onChangeTitle,
  onChangeFirstName,
  onChangeMiddletName,
  onChangeFamilyName,
  onChangeBirthNation,
  onChangeOtherNationality,
  onChangeAnotherNationality,
  onChangeContactNo,
  onChangeBirthDate,
  onChangeDocumentNo,
  onChangeIssuedPlace,
  onChangeIssuedDate,
  onChangeExpiredDate,
  onChangeCountryAddress,
  onChangeStateAddress,
  onChangeCityAddress,
  onChangeOccupation,
  onChangeCompanyPlace,
  onChangeAnnualIncome,
  onChangeNationality,
  countries = [],
  onclickNext,
  onClickBack,
  onChangeMaritalStatus,
  onChangeDocumentType,
  onChangeEmail,
  onChangeCityBirth,
  onChangeHomeAddress,

  // FILES
  onChangeBiodata,
  onChangePhotograph,
  onDragBiodata,
  onDragPhotograph,
}: ApplicationInforProps) => {
  const [entriesEnum, setEntriesEnum] = useState({
    annualIncome: [],
    maritalStatus: [],
    occupation: [],
    sex: [],
    title: [],
    travelDocumentType: [],
  });
  const [statesAddress, setStatesAddress] = useState<string[]>([]);
  const [citiesAddress, setCitiesAddress] = useState<string[]>([]);
  const [previewBiodata, setPreviewBiodata] = useState<string | undefined>("");
  const [previewPhotograph, setPreviewPhotograph] = useState<string | undefined>("");

  useEffect(() => {
    (async () => {
      try {
        const statesResponse = await getStatesData(dataProps.addressCountry);
        console.log(statesResponse);
        if (statesResponse) {
          const states = statesResponse.map((state: any) => {
            return state.state;
          });
          setStatesAddress(states);
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, [dataProps.addressCountry]);

  useEffect(() => {
    (async () => {
      try {
        const citesResponse = await getCitiesData(dataProps.addressState);
        console.log(citesResponse);
        if (citesResponse) {
          const cities = citesResponse.map((city: any) => {
            return city.city;
          });
          setCitiesAddress(cities);
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, [dataProps.addressState]);

  useEffect(() => {
    if (!dataProps.biodata) {
      setPreviewBiodata(undefined);
      return;
    } else {
      const url = URL.createObjectURL(dataProps.biodata);
      setPreviewBiodata(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [dataProps.biodata]);

  useEffect(() => {
    if (!dataProps.photograph) {
      setPreviewPhotograph(undefined);
      return;
    }
    const url = URL.createObjectURL(dataProps.photograph);
    setPreviewPhotograph(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [dataProps.photograph]);

  const countriesNameArr = countries.map((nation: any) => nation.engName);

  useEffect(() => {
    (async () => {
      const data = await getApplicationInfoEnum();
      setEntriesEnum(data);
    })();
  }, []);

  const handleDragOVerBiodata = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragOVerPhotograph = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const PreviewDisplay = ({
    file,
    preview = undefined,
  }: {
    file: File;
    preview: string | undefined;
  }) => {
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {file && file.type === "application/pdf" ? (
          <iframe src={preview} style={{ width: "100%", height: "400px" }} />
        ) : (
          <img
            src={preview}
            alt={file.name}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
          justifyContent: "space-between",
          position: "relative",
          height: "100%",
        }}
      >
        <FormContainer title="Upload Biodata Page of Passport" width={60}>
          <div draggable={true} onDrop={onDragBiodata} onDragOver={handleDragOVerBiodata}>
            <PaperDiv>
              Please upload the biodata page of your travel document. After the successful
              completion of the upload, your biographic information will be populated in
              the corresponding fields of the application. For accurate results, make sure
              the MRZ is contained within the full width of the photograph and the
              photograph is not blurry.
            </PaperDiv>
            <PaperDiv>
              Applicant is required to submit his/her travel document that is valid for at
              least six months from the date of visa application for single entry and one
              year for multiple entry (18 months for OA Visa).
            </PaperDiv>
            <Box sx={{ m: 2, mb: 1 }}>
              {/* UPLOAD BUTTON */}
              <Button
                component="label"
                fullWidth
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                role={undefined}
                size="small"
              >
                {dataProps.biodata
                  ? "Upload new file"
                  : "Drag and drop file or browse from computer"}

                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => onChangeBiodata(e, "biodata")}
                  accept=".png, .jpg, .jpeg, .pdf"
                  required
                  name="biodata"
                />
              </Button>
            </Box>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              (.JPG, .JPEG Limit Size is 3 MB)
            </Box>

            {/* PASSPORT PICTURE */}
            <Box sx={{ display: "flex", mb: 3, justifyContent: "center" }}>
              {dataProps.biodata ? (
                <PreviewDisplay file={dataProps.biodata} preview={previewBiodata} />
              ) : (
                <Image
                  src="https://www.thaievisa.go.th/static/media/dummy_passport.f34bd0bb.jpg"
                  alt="passport Pic"
                  width={460}
                  height={270}
                />
              )}
            </Box>
          </div>
        </FormContainer>

        <FormContainer title="Upload a photograph" width={40}>
          <div
            onDrop={onDragPhotograph}
            onDragOver={handleDragOVerPhotograph}
            draggable={true}
          >
            <PaperDiv>
              Please upload an appropriate photograph taken within six months. Failure to
              do so may result in rejection of visa request.
            </PaperDiv>

            <Box sx={{ m: 2 }}>
              <Button fullWidth color="secondary">
                Download Example Photograph
              </Button>
            </Box>

            <Box sx={{ m: 2, mb: 1 }}>
              {/* UPLOAD BUTTON */}
              <Button
                component="label"
                role={undefined}
                fullWidth
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                size="small"
              >
                {dataProps.photograph
                  ? "Upload new file"
                  : "  Drag and drop file or browse from computer"}
                <VisuallyHiddenInputPhotograph
                  type="file"
                  onChange={(e) => onChangePhotograph(e, "photograph")}
                  multiple
                  accept=".png, .jpg, .jpeg, .pdf"
                  required
                />
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              {dataProps.photograph ? (
                <PreviewDisplay file={dataProps.photograph} preview={previewPhotograph} />
              ) : (
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/people-customer-unknown-512.png"
                  alt="passport Pic"
                  width={250}
                  height={250}
                />
              )}
            </Box>
          </div>
        </FormContainer>
      </Box>

      {/* PERSONAL INFORMATION */}
      <FormContainer title="Personal Information">
        <InputContainer width={66.6}>
          <AutoCompleteForm
            name="title"
            onChange={(e) => onChangeTitle(e, "title")}
            title="Title"
            inputData={entriesEnum.title}
            value={dataProps.title}
            placeHolder="Select your title"
          />
          <AutoCompleteForm
            name="sex"
            placeHolder="Select your Sex"
            value={dataProps.sex}
            onChange={(e) => onChangeSex(e, "sex")}
            title="Sex"
            inputData={entriesEnum.sex}
          />
        </InputContainer>

        <InputContainer width={100}>
          <TextFieldApply
            name="firstName"
            requiredMasked={true}
            title="First name"
            placeholder="Enter your first name"
            onChange={(e) => onChangeFirstName(e, "firstName")}
            value={dataProps.firstName}
          />
          <TextFieldApply
            name="middleName"
            title="Middle name (If applicable)"
            placeholder="Enter your middle name"
            onChange={(e) => onChangeMiddletName(e, "middleName")}
            value={dataProps.middleName}
          />
          <TextFieldApply
            name="familyName"
            title="Family name"
            requiredMasked={true}
            placeholder="Enter your family name"
            onChange={(e) => onChangeFamilyName(e, "familyName")}
            value={dataProps.familyName}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <MobileTextField
            name="contactNo"
            onChange={(e) => onChangeContactNo(e, "contactNo")}
            value={dataProps.contactNo}
          />
          <TextFieldApply
            name="email"
            title="Email"
            placeholder="Enter your Email"
            onChange={(e) => onChangeEmail(e, "email")}
            value={dataProps.email}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <AutoCompleteForm
            inputData={countriesNameArr}
            placeHolder="Enter your nationality"
            title="Nationality"
            name="nationality"
            onChange={(e) => onChangeNationality(e, "nationality")}
            value={dataProps.nationality}
          />
        </InputContainer>

        <Box sx={{ pr: 2, mt: 1, pl: 2 }}>
          Do you hold any other nationality than the one indicated?
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}> *</span>
          <span style={{ marginLeft: "10px" }}>
            No
            <Switch
              slotProps={{ input: { "aria-label": "controlled" } }}
              checked={dataProps.otherNationality}
              onChange={onChangeOtherNationality}
            />
            Yes
          </span>
        </Box>

        <InputContainer width={66.6}>
          <AutoCompleteForm
            name="nationalityBirth"
            value={dataProps.nationalityBirth}
            inputData={countriesNameArr}
            title="Nationality at birth"
            placeHolder="Select your place of birth"
            onChange={(e) => onChangeBirthNation(e, "nationalityBirth")}
          />
        </InputContainer>

        {dataProps.otherNationality && (
          <InputContainer width={66.6}>
            <AutoCompleteForm
              name="anotherNationality"
              title="Other country/territory of nationality"
              inputData={countriesNameArr}
              value={dataProps.anotherNationality}
              placeHolder="Select your other country/territory of nationality"
              onChange={(e) => onChangeAnotherNationality(e, "anotherNationality")}
            />
          </InputContainer>
        )}
        <InputContainer width={66.6}>
          <AutoCompleteForm
            name="nationalityBirth"
            onChange={(e) => onChangeTitle(e, "nationalityBirth")}
            title="Place of birth"
            inputData={countriesNameArr}
            value={dataProps.nationalityBirth}
            placeHolder="Select your Place of birth"
          />
          <TextFieldApply
            name="cityBirth"
            title="City of birth"
            placeholder="Enter your City of birth"
            onChange={(e) => onChangeCityBirth(e, "cityBirth")}
            requiredMasked={true}
            value={dataProps.cityBirth}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <DatePickerComponent
            name="birthDate"
            value={dataProps.birthDate}
            title="Date of birth"
            onChange={onChangeBirthDate}
          />
          <AutoCompleteForm
            name="maritalStatus"
            onChange={(e) => onChangeMaritalStatus(e, "maritalStatus")}
            title="Marital status"
            inputData={entriesEnum.maritalStatus}
            value={dataProps.maritalStatus}
            placeHolder="Select your Marital status"
          />
        </InputContainer>
      </FormContainer>

      {/* TRAVEL Document */}
      <FormContainer title="Travel Document">
        <InputContainer width={66.6}>
          <AutoCompleteForm
            name="documentType"
            onChange={(e) => onChangeDocumentType(e, "documentType")}
            title="Type of Travel Document "
            inputData={entriesEnum.travelDocumentType}
            value={dataProps.documentType}
            placeHolder="Select your Type of Travel Document"
          />
        </InputContainer>
        <InputContainer width={66.6}>
          <TextFieldApply
            name="documentNumber"
            title="Travel Document No. "
            placeholder="Enter your Travel Document No."
            requiredMasked={true}
            onChange={(e) => onChangeDocumentNo(e, "documentNumber")}
            value={dataProps.documentNumber}
          />
        </InputContainer>
        <InputContainer width={66.6}>
          <TextFieldApply
            name="issuesPlace"
            title="Place of issue"
            placeholder="Enter your Place of issue"
            requiredMasked={true}
            onChange={(e) => onChangeIssuedPlace(e, "issuesPlace")}
            value={dataProps.issuesPlace}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <DatePickerComponent
            name="issuesDate"
            title="Date of issue"
            onChange={onChangeIssuedDate}
            value={dataProps.issuesDate}
          />
          <DatePickerComponent
            name="expiryDate"
            title="Date of expiry"
            onChange={onChangeExpiredDate}
            value={dataProps.expiryDate}
          />
        </InputContainer>
      </FormContainer>

      {/* ADDRESS */}
      <FormContainer title="Address information">
        <InputContainer width={100}>
          <TextFieldApply
            name="homeAddress"
            title="Home address"
            placeholder="Enter your Home address"
            onChange={(e) => onChangeHomeAddress(e, "homeAddress")}
            requiredMasked={true}
            value={dataProps.homeAddress}
          />
        </InputContainer>

        <InputContainer width={100}>
          <AutoCompleteForm
            name="addressCountry"
            title="Country / Territory"
            placeHolder="Select your Country / Territory"
            value={dataProps.addressCountry}
            inputData={countriesNameArr}
            onChange={(e) => onChangeCountryAddress(e, "addressCountry")}
          />
          <AutoCompleteForm
            name="addressState"
            title="States / City"
            placeHolder="Select your States / City"
            value={dataProps.addressState}
            inputData={statesAddress}
            onChange={(e) => onChangeStateAddress(e, "addressState")}
          />
        </InputContainer>

        <Box sx={{ display: "flex", width: "33.3%" }}>
          <AutoCompleteForm
            name="addressCity"
            title="City"
            placeHolder="Select your City"
            value={dataProps.addressCity}
            inputData={citiesAddress}
            onChange={(e) => onChangeCityAddress(e, "addressCity")}
          />
        </Box>
        <Box sx={{ pr: 2, mt: 1, pl: 2, mb: 1 }}>
          Is your permanent address same as your current address?
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}> *</span>
          <span style={{ marginLeft: "10px" }}>
            No
            <Switch
              slotProps={{ input: { "aria-label": "controlled" } }}
              checked={dataProps.currentAddress}
              onChange={onChangeOtherNationality}
            />
            Yes
          </span>
        </Box>
      </FormContainer>

      {/* JOB */}
      <FormContainer title="Employment details">
        <InputContainer width={100}>
          <AutoCompleteForm
            title="Occupation "
            name="occupation"
            placeHolder="Select your Occupation"
            value={dataProps.occupation}
            onChange={(e) => onChangeOccupation(e, "occupation")}
            inputData={entriesEnum.occupation}
          />
          <TextFieldApply
            name="company"
            title="Company/Institute"
            requiredMasked={true}
            placeholder="Enter your Company/Institute"
            onChange={(e) => onChangeCompanyPlace(e, "company")}
            value={dataProps.company}
          />
          <AutoCompleteForm
            title="Annual income"
            name="annualIncome"
            placeHolder="Select your Annual income"
            value={dataProps.annualIncome}
            onChange={(e) => onChangeAnnualIncome(e, "annualIncome")}
            inputData={entriesEnum.annualIncome}
          />
        </InputContainer>
      </FormContainer>
      <ButtonSumbit
        displayBackButton={true}
        onclickNext={onclickNext}
        onClickBack={onClickBack}
      />
    </Box>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const VisuallyHiddenInputPhotograph = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PaperDiv = ({ children }: { children: ReactNode }) => {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      {children}
    </Paper>
  );
};

export default ApplicationInformation;
