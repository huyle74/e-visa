import { eligibilityEntries } from "@/app/libs/entries-input-visa";
import { EligibilityInput } from "@/app/libs/types";
import { Box, SelectChangeEvent } from "@mui/material";
import AutoCompleteForm from "../autocompleteForm";
import FormContainer from "../containerForm";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

type E = SelectChangeEvent;

interface EligibilityStepProps {
  onChangeInpurtCountryPassport: (e: E) => void;
  onChangeCurrentLocation: (e: E) => void;
  onChangeApplyAt: (e: E) => void;
  onChangeDocumentType: (e: E) => void;
  onChangeVisaType: (e: E) => void;
  onChangeVisitPurpose: (e: E) => void;
  onChangeNumberOfEntries: (e: E) => void;
  valueProps: EligibilityInput;
}
const EligibilityStep = ({
  onChangeInpurtCountryPassport,
  onChangeCurrentLocation,
  onChangeApplyAt,
  onChangeDocumentType,
  onChangeNumberOfEntries,
  onChangeVisaType,
  onChangeVisitPurpose,
  valueProps,
}: EligibilityStepProps) => {
  const { applyAt, currentLocation, documentType, inputCountryPassport, numberOfEntries, visaType, visitPurpose } =
    valueProps;

  return (
    <Box sx={{ mt: 4 }}>
      <FormContainer title="Check your eligibility">
        <AutoCompleteForm
          onChange={onChangeInpurtCountryPassport}
          value={inputCountryPassport}
          title="Country/Territory of Passport/TD"
          inputData={eligibilityEntries.inputCountryPassport}
        />
        <AutoCompleteForm
          title="Current Location"
          inputData={eligibilityEntries.currentLocation}
          onChange={onChangeCurrentLocation}
          value={currentLocation}
        />
        <AutoCompleteForm
          onChange={onChangeApplyAt}
          title="Apply at"
          inputData={eligibilityEntries.applyAt}
          value={applyAt}
        />
      </FormContainer>

      <FormContainer title="Purpose of Visit">
        <AutoCompleteForm
          onChange={onChangeDocumentType}
          title="Travel document type"
          inputData={eligibilityEntries.documentType}
          value={documentType}
        />
        <AutoCompleteForm onChange={onChangeVisaType} title="Visa Type" inputData={names} value={visaType} />
        <AutoCompleteForm
          title="Purpose of Visit"
          onChange={onChangeVisitPurpose}
          inputData={eligibilityEntries.visitPurpose}
          value={visitPurpose}
        />{" "}
        <AutoCompleteForm
          title="Number of Entries"
          onChange={onChangeNumberOfEntries}
          inputData={eligibilityEntries.numberOfEntries}
          value={numberOfEntries}
        />
      </FormContainer>
    </Box>
  );
};

export default EligibilityStep;
