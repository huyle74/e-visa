import { ReactNode, ChangeEvent } from "react";
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
import { DatePickerProps } from "@mui/x-date-pickers";
import FormContainer from "../containerForm";
import AutoCompleteForm from "../autocompleteForm";
import { applicationInformationEntries } from "@/app/libs/entries-input-visa";
import { ApplicationInformationInputDto } from "@/app/libs/types";
import TextFieldApply from "../textField";
import MobileTextField from "../mobileInput";
import DatePickerComponent from "../date-picker";
import InputContainer from "../input-containter";
import { countries } from "@/app/static/countries";

type E = SelectChangeEvent;

interface ApplicationInforProps {
  dataProps: ApplicationInformationInputDto;
  onChangeTitle: (e: E) => void;
  onChangeSex: (e: E) => void;
  onChangeFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMiddletName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFamilyName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBirthNation: (e: SelectChangeEvent) => void;
  onChangeOtherNationality: NonNullable<SwitchProps["onChange"]>;
  onChangeAnotherNationality: (e: E) => void;
  onChangeContactNo: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBirthDate: NonNullable<DatePickerProps["onChange"]>;
  onChangeDocumentNo: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeIssuedPlace: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeIssuedDate: NonNullable<DatePickerProps["onChange"]>;
  onChangeExpiredDate: NonNullable<DatePickerProps["onChange"]>;
  onChangeCountryAddress: (e: E) => void;
  onChangeStateAddress: (e: E) => void;
  onChangeCityAddress: (e: E) => void;
  onChangeOccupation: (e: E) => void;
  onChangeCompanyPlace: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAnnualIncome: (e: E) => void;
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
}: ApplicationInforProps) => {
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
        <FormContainer title="Upload Biodata Page of Passport">
          <PaperDiv>
            Please upload the biodata page of your travel document. After the successful
            completion of the upload, your biographic information will be populated in the
            corresponding fields of the application. For accurate results, make sure the
            MRZ is contained within the full width of the photograph and the photograph is
            not blurry.
          </PaperDiv>
          <PaperDiv>
            Applicant is required to submit his/her travel document that is valid for at
            least six months from the date of visa application for single entry and one
            year for multiple entry (18 months for OA Visa).
          </PaperDiv>
          <Box sx={{ m: 2, mb: 1 }}>
            {/* UPLOAD BUTTON */}
            <Button
              fullWidth
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Drag and drop file or browse from computer
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", mb: 3 }}>(.JPG, .JPEG Limit Size is 3 MB)</Box>

          {/* PASSPORT PICTURE */}
          <Box sx={{ display: "flex", mb: 3, justifyContent: "center" }}>
            <Image
              src="https://www.thaievisa.go.th/static/media/dummy_passport.f34bd0bb.jpg"
              alt="passport Pic"
              width={460}
              height={270}
            />
          </Box>
        </FormContainer>

        <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
          <FormContainer title="Upload a photograph">
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
                sx={{ fontSize: "1rem" }}
                fullWidth
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Drag and drop file or browse from computer
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Image
                src="https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/people-customer-unknown-512.png"
                width={250}
                height={250}
                alt="photo"
              />
            </Box>
          </FormContainer>
        </Box>
      </Box>

      {/* PERSONAL INFORMATION */}
      <FormContainer title="Personal Information">
        <InputContainer width={66.6}>
          <AutoCompleteForm
            onChange={onChangeTitle}
            title="Title"
            inputData={applicationInformationEntries.personalInfo.title}
            value={dataProps.personalInfo.title}
            placeHolder="Select your title"
          />
          <AutoCompleteForm
            placeHolder="Select your Sex"
            value={dataProps.personalInfo.sex}
            onChange={onChangeSex}
            title="Sex"
            inputData={applicationInformationEntries.personalInfo.sex}
          />
        </InputContainer>

        <InputContainer width={100}>
          <TextFieldApply
            requiredMasked={true}
            title="First name"
            placeholder="Enter your first name"
            onChange={onChangeFirstName}
          />
          <TextFieldApply
            title="Middle name (If applicable)"
            placeholder="Enter your middle name"
            onChange={onChangeMiddletName}
          />
          <TextFieldApply
            title="Family name"
            requiredMasked={true}
            placeholder="Enter your family name"
            onChange={onChangeFamilyName}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <MobileTextField
            onChange={onChangeContactNo}
            value={dataProps.personalInfo.contactNo}
          />
          <TextFieldApply
            title="Email"
            placeholder="Enter your Email"
            onChange={onChangeFamilyName}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <AutoCompleteForm
            value={dataProps.personalInfo.nationalityBirth}
            inputData={applicationInformationEntries.personalInfo.nationalityBirth}
            title="Nationality at birth"
            placeHolder="Select your place of birth"
            onChange={onChangeBirthNation}
          />
        </InputContainer>

        <Box sx={{ pr: 2, mt: 1, pl: 2 }}>
          Do you hold any other nationality than the one indicated?
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}> *</span>
          <span style={{ marginLeft: "10px" }}>
            No
            <Switch
              slotProps={{ input: { "aria-label": "controlled" } }}
              checked={dataProps.personalInfo.otherNationality}
              onChange={onChangeOtherNationality}
            />
            Yes
          </span>
        </Box>

        {dataProps.personalInfo.otherNationality && (
          <InputContainer width={66.6}>
            <AutoCompleteForm
              title="Other country/territory of nationality"
              inputData={countriesNameArr}
              value={dataProps.personalInfo.anotherNationity}
              placeHolder="Select your other country/territory of nationality"
              onChange={onChangeAnotherNationality}
            />
          </InputContainer>
        )}
        <InputContainer width={66.6}>
          <AutoCompleteForm
            onChange={onChangeTitle}
            title="Place of birth"
            inputData={countriesNameArr}
            value={dataProps.personalInfo.nationalityBirth}
            placeHolder="Select your Place of birth"
          />
          <TextFieldApply
            title="City of birth"
            placeholder="Enter your City of birth"
            onChange={onChangeFamilyName}
            requiredMasked={true}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <DatePickerComponent
            value={dataProps.personalInfo.birthDate}
            title="Date of birth"
            onChange={onChangeBirthDate}
          />
          <AutoCompleteForm
            onChange={onChangeTitle}
            title="Marital status"
            inputData={applicationInformationEntries.travelDocument.type}
            value={dataProps.personalInfo.nationalityBirth}
            placeHolder="Select your Marital status"
          />
        </InputContainer>
      </FormContainer>

      {/* TRAVEL Document */}
      <FormContainer title="Travel Document">
        <InputContainer width={66.6}>
          <AutoCompleteForm
            onChange={onChangeTitle}
            title="Type of Travel Document "
            inputData={applicationInformationEntries.travelDocument.type}
            value={dataProps.personalInfo.nationalityBirth}
            placeHolder="Select your Type of Travel Document"
          />
        </InputContainer>
        <InputContainer width={66.6}>
          <TextFieldApply
            title="Travel Document No. "
            placeholder="Enter your Travel Document No."
            requiredMasked={true}
            onChange={onChangeDocumentNo}
          />
        </InputContainer>
        <InputContainer width={66.6}>
          <TextFieldApply
            title="Place of issue"
            placeholder="Enter your Place of issue"
            requiredMasked={true}
            onChange={onChangeIssuedPlace}
          />
        </InputContainer>

        <InputContainer width={66.6}>
          <DatePickerComponent
            title="Date of issue"
            onChange={onChangeIssuedDate}
            value={dataProps.travelDocument.issuesDate}
          />
          <DatePickerComponent
            title="Date of expiry"
            onChange={onChangeExpiredDate}
            value={dataProps.travelDocument.expiryDate}
          />
        </InputContainer>
      </FormContainer>

      {/* ADDRESS */}
      <FormContainer title="Address information">
        <InputContainer width={100}>
          <TextFieldApply
            title="Home address"
            placeholder="Enter your Home address"
            onChange={onChangeFamilyName}
            requiredMasked={true}
          />
        </InputContainer>

        <InputContainer width={100}>
          <AutoCompleteForm
            title="Country / Territory"
            placeHolder="Select your Country / Territory"
            value={dataProps.address.country}
            inputData={countriesNameArr}
            onChange={onChangeCountryAddress}
          />
          <AutoCompleteForm
            title="States / City"
            placeHolder="Select your States / City"
            value={dataProps.address.state}
            inputData={countriesNameArr}
            onChange={onChangeStateAddress}
          />
        </InputContainer>

        <Box sx={{ display: "flex", width: "33.3%" }}>
          <AutoCompleteForm
            title="City"
            placeHolder="Select your City"
            value={dataProps.address.city}
            inputData={countriesNameArr}
            onChange={onChangeCityAddress}
          />
        </Box>
        <Box sx={{ pr: 2, mt: 1, pl: 2, mb: 1 }}>
          Is your permanent address same as your current address?
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}> *</span>
          <span style={{ marginLeft: "10px" }}>
            No
            <Switch
              slotProps={{ input: { "aria-label": "controlled" } }}
              checked={dataProps.address.currentAddress}
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
            placeHolder="Select your Occupation"
            value={dataProps.employment.occupation}
            onChange={onChangeOccupation}
            inputData={applicationInformationEntries.employment.occupation}
          />
          <TextFieldApply
            title="Company/Institute"
            requiredMasked={true}
            placeholder="Enter your Company/Institute"
            onChange={onChangeCompanyPlace}
          />
          <AutoCompleteForm
            title="Annual income"
            placeHolder="Select your Annual income"
            value={dataProps.employment.annualIncome}
            onChange={onChangeAnnualIncome}
            inputData={applicationInformationEntries.employment.annualIncome}
          />
        </InputContainer>
      </FormContainer>
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

const PaperDiv = ({ children }: { children: ReactNode }) => {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      {children}
    </Paper>
  );
};

export default ApplicationInformation;

const countriesNameArr = countries.map((nation) => nation.engName);
