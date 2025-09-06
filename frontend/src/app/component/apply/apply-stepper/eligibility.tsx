import { useState, useEffect } from "react";

import { eligibilityEntries } from "@/app/libs/entries-input-visa";
import { EligibilityInputDto } from "@/app/libs/types";
import { Box, SelectChangeEvent } from "@mui/material";
import AutoCompleteForm from "../autocompleteForm";
import FormContainer from "../containerForm";
import { getEligibilltyEnum, getCountriesData } from "@/app/server-side/static-data";
import ButtonSumbit from "../button-submit-group";

type Select = (e: SelectChangeEvent, name: string) => void;

interface EligibilityEntries {
  documentType: string[];
  visaTypes: string[];
  visitPurpose: string[];
}

interface EligibilityStepProps {
  onChangeInpurtCountryPassport: Select;
  onChangeCurrentLocation: Select;
  onChangeApplyAt: Select;
  onChangeDocumentType: Select;
  onChangeVisaType: Select;
  onChangeVisitPurpose: Select;
  onChangeNumberOfEntries: Select;
  onClickNext: () => void;
  loading: boolean;
  disabled: boolean;
  valueProps: EligibilityInputDto;
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
          name="inputCountryPassport"
          onChange={(e) => onChangeInpurtCountryPassport(e, "inputCountryPassport")}
          value={inputCountryPassport}
          title="Country/Territory of Passport/TD"
          inputData={countriesName}
          placeHolder="Select your Territory of Passport"
          disabled={disabled}
        />
        <AutoCompleteForm
          name="currentLocation"
          title="Current Location"
          inputData={countriesName}
          onChange={(e) => onChangeCurrentLocation(e, "currentLocation")}
          value={currentLocation}
          placeHolder="Select your current location"
          disabled={disabled}
        />
        <AutoCompleteForm
          name="applyAt"
          onChange={(e) => onChangeApplyAt(e, "applyAt")}
          title="Apply at"
          inputData={eligibilityEntries.applyAt}
          value={applyAt}
          placeHolder="Select your apply place"
          disabled={disabled}
        />
      </FormContainer>

      <FormContainer title="Purpose of Visit">
        <AutoCompleteForm
          name="documentType"
          onChange={(e) => onChangeDocumentType(e, "documentType")}
          title="Travel document type"
          inputData={eligibilityEntry?.documentType}
          value={documentType}
          disabled={disabled}
          placeHolder="Select your visit purpose"
        />
        <AutoCompleteForm
          name="visaType"
          onChange={(e) => onChangeVisaType(e, "visaType")}
          title="Visa Type"
          inputData={eligibilityEntry?.visaTypes}
          value={visaType}
          disabled={disabled}
          placeHolder="Select your visa type"
        />
        <AutoCompleteForm
          name="visitPurpose"
          title="Purpose of Visit"
          onChange={(e) => onChangeVisitPurpose(e, "visitPurpose")}
          inputData={eligibilityEntry.visitPurpose}
          disabled={disabled}
          value={visitPurpose}
          placeHolder="Select your visit's purpose"
        />
        <AutoCompleteForm
          name="numberOfEntries"
          title="Number of Entries"
          onChange={(e) => onChangeNumberOfEntries(e, "numberOfEntries")}
          inputData={eligibilityEntries.numberOfEntries}
          value={numberOfEntries}
          disabled={disabled}
          placeHolder="Select your number of entries"
        />
      </FormContainer>
      <ButtonSumbit onclickNext={onClickNext} loading={loading} />
    </Box>
  );
};

export default EligibilityStep;
