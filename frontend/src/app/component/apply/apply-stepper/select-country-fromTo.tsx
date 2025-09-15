import { MouseEventHandler } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useCountries } from "@/app/contexts/countriesContext";
import AutoCompleteForm from "../autocompleteForm";
import InputContainer from "../input-containter";
import FormContainer from "../containerForm";
import ButtonSumbit from "../button-submit-group";
import { primary } from "@/app/libs/color-config";
import { CountrySelectionDto } from "@/app/libs/types";

type Select = (e: SelectChangeEvent, name: string) => void;

interface CountrySelectionStepProps {
  onChangeFromCountry: Select;
  onChangeToCountry: Select;
  values: CountrySelectionDto;
  disabled: boolean;
  loading: boolean;
  onclickNext: MouseEventHandler<HTMLButtonElement>;
}

const CountrySelectionStep = ({
  onChangeFromCountry,
  onChangeToCountry,
  values,
  disabled,
  loading,
  onclickNext,
}: CountrySelectionStepProps) => {
  const { countriesName } = useCountries();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormContainer title="Country to travel">
        <InputContainer>
          <AutoCompleteForm
            inputData={countriesName}
            name="fromCountry"
            placeHolder="Select your origin country"
            title="From"
            disabled={disabled}
            value={values.fromCountry}
            onChange={(e) => onChangeFromCountry(e, "fromCountry")}
          />
          <AutoCompleteForm
            inputData={countriesName}
            name="toCountry"
            placeHolder="Select your destination country"
            title="To"
            disabled={disabled}
            value={values.toCountry}
            onChange={(e) => onChangeToCountry(e, "toCountry")}
          />
        </InputContainer>
      </FormContainer>
      <Box
        sx={{
          mt: 3,
          ml: "auto",
          display: "flex",
          alignItems: "center",
          fontWeight: 900,
          fontSize: "1.5rem",
          color: primary,
        }}
      >
        <AttachMoneyIcon color="secondary" />
        {values.price} USD
      </Box>
      <ButtonSumbit loading={loading} onclickNext={onclickNext} />
    </Box>
  );
};

export default CountrySelectionStep;
