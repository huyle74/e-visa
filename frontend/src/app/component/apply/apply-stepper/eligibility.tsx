import { useState, useEffect } from "react";

import { eligibilityEntries } from "@/app/libs/entries-input-visa";
import { EligibilityInput } from "@/app/libs/types";
import { Box, SelectChangeEvent } from "@mui/material";
import AutoCompleteForm from "../autocompleteForm";
import FormContainer from "../containerForm";
import { getEligibilltyEnum, getCountriesData } from "@/app/server-side/static-data";
import ButtonSumbit from "../button-submit-group";

type E = SelectChangeEvent;

interface EligibilityEntries {
  documentType: string[];
  visaTypes: string[];
  visitPurpose: string[];
}

interface EligibilityStepProps {
  onChangeInpurtCountryPassport: (e: E) => void;
  onChangeCurrentLocation: (e: E) => void;
  onChangeApplyAt: (e: E) => void;
  onChangeDocumentType: (e: E) => void;
  onChangeVisaType: (e: E) => void;
  onChangeVisitPurpose: (e: E) => void;
  onChangeNumberOfEntries: (e: E) => void;
  onClickNext: () => void;
  loading: boolean;
  disabled: boolean;
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
  onClickNext,
  loading,
  disabled,
  valueProps,
}: EligibilityStepProps) => {
  const {
    applyAt,
    currentLocation,
    documentType,
    inputCountryPassport,
    numberOfEntries,
    visaType,
    visitPurpose,
  } = valueProps;

  const [eligibilityEntry, setEligibilityEntry] = useState<EligibilityEntries>({
    visaTypes: [],
    documentType: [],
    visitPurpose: [],
  });
  const [countriesName, setCountriesName] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const countries = await getCountriesData();
      const countriesName = countries.map((country: any) => {
        return country.engName;
      });
      const result = await getEligibilltyEnum();
      setCountriesName(countriesName);
      setEligibilityEntry(result);
    })();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <FormContainer title="Check your eligibility">
        <AutoCompleteForm
          onChange={onChangeInpurtCountryPassport}
          value={inputCountryPassport}
          title="Country/Territory of Passport/TD"
          inputData={countriesName}
          placeHolder="Select your Territory of Passport"
          disabled={disabled}
        />
        <AutoCompleteForm
          title="Current Location"
          inputData={countriesName}
          onChange={onChangeCurrentLocation}
          value={currentLocation}
          placeHolder="Select your current location"
          disabled={disabled}
        />
        <AutoCompleteForm
          onChange={onChangeApplyAt}
          title="Apply at"
          inputData={eligibilityEntries.applyAt}
          value={applyAt}
          placeHolder="Select your apply place"
          disabled={disabled}
        />
      </FormContainer>

      <FormContainer title="Purpose of Visit">
        <AutoCompleteForm
          onChange={onChangeDocumentType}
          title="Travel document type"
          inputData={eligibilityEntry?.documentType}
          value={documentType}
          disabled={disabled}
          placeHolder="Select your visit purpose"
        />
        <AutoCompleteForm
          onChange={onChangeVisaType}
          title="Visa Type"
          inputData={eligibilityEntry?.visaTypes}
          value={visaType}
          disabled={disabled}
          placeHolder="Select your visa type"
        />
        <AutoCompleteForm
          title="Purpose of Visit"
          onChange={onChangeVisitPurpose}
          inputData={eligibilityEntry.visitPurpose}
          disabled={disabled}
          value={visitPurpose}
          placeHolder="Select your visit's purpose"
        />
        <AutoCompleteForm
          title="Number of Entries"
          onChange={onChangeNumberOfEntries}
          inputData={eligibilityEntries.numberOfEntries}
          value={numberOfEntries}
          disabled={disabled}
          placeHolder="Select your number of entries"
        />
      </FormContainer>
      <ButtonSumbit onClickNext={onClickNext} loading={loading} />
    </Box>
  );
};

export default EligibilityStep;
