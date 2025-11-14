import { MouseEventHandler } from "react";
import {
  Box,
  SelectChangeEvent,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useCountries } from "@/app/contexts/countriesContext";
import AutoCompleteForm from "../autocompleteForm";
import InputContainer from "../input-containter";
import FormContainer from "../containerForm";
import ButtonSubmit from "../button-submit-group";
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
  totalPrice: number | string | undefined;
}

const CountrySelectionStep = ({
  onChangeFromCountry,
  onChangeToCountry,
  values,
  disabled,
  loading,
  onclickNext,
  totalPrice,
}: CountrySelectionStepProps) => {
  const matches = useMediaQuery("(max-width:600px)");

  const { fromCountries, toCountries } = useCountries();
  const fromCountry = fromCountries.map((nation: any) => {
    if (nation.from === true) return nation.engName;
  });
  const toCountry = toCountries.map((nation: any) => {
    if (nation.to === true) return nation.engName;
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: matches ? "45vh" : "100%",
      }}
    >
      <FormContainer title="Country to travel">
        <InputContainer>
          <AutoCompleteForm
            inputData={fromCountry}
            name="fromCountry"
            placeHolder={
              matches ? "Select country" : "Select your origin country"
            }
            title="From"
            disabled={disabled}
            value={values.fromCountry}
            onChange={(e) => onChangeFromCountry(e, "fromCountry")}
          />
          <AutoCompleteForm
            inputData={toCountry}
            name="toCountry"
            placeHolder={
              matches ? "Select country" : "Select your destination country"
            }
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
        {totalPrice ?? <CircularProgress size={20} />} USD
      </Box>
      <ButtonSubmit loading={loading} onclickNext={onclickNext} />
    </Box>
  );
};

export default CountrySelectionStep;
