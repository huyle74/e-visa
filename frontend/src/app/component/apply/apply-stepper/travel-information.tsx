import { ChangeEvent } from "react";
import { Box, SelectChangeEvent, SwitchProps } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import AutoCompleteForm from "../autocompleteForm";
import FormContainer from "../containerForm";
import TextFieldApply from "../textField";
import SelectDepartPort from "../select-ratio-vehicle";
import { travelInformationEntries } from "@/app/libs/entries-input-visa";
import {
  TravelInformationInputDto,
  TransportationVehicleInputDto,
  AccommodationInputDto,
} from "@/app/libs/types";
import InputContainer from "../input-containter";
import SwithYesNo from "../switch";
import RadioComponent from "../select-ratio";
import DatePickerComponent from "../date-picker";
import MobileTextField from "../mobileInput";

type EventTextField = (e: ChangeEvent<HTMLInputElement>) => void;
type EventSelect = (e: SelectChangeEvent) => void;
type EventSwitch = NonNullable<SwitchProps["onChange"]>;

interface TravelInformationProps {
  data: TravelInformationInputDto;
  vehicle: TransportationVehicleInputDto;
  onChangeArrivalDate: NonNullable<DatePickerProps["onChange"]>;
  onChangeDepartDate: NonNullable<DatePickerProps["onChange"]>;
  onChangeSelectCountry: EventSelect;
  onChangeDepartPort: EventTextField;
  onChangeHadVisit: EventSwitch;
  onChangeDidApply: EventSwitch;
  onChangePartOfTour: EventSwitch;
  onChangeTransportMode: EventSelect;
  onChangeTransportVehicleCode: EventTextField;
  onChangeAccommodationType: EventTextField;
  onChangeAccommodationName: EventTextField;
  onChangeAccommodationAddress: EventTextField;
  onChangeAccommodationCity: EventSelect;
  onChangeAccommodationPhone: EventTextField;
  onChangeAccommodationDurationDay: EventTextField;
}

const TravelInformation = ({
  data,
  vehicle,
  onChangeArrivalDate,
  onChangeAccommodationPhone,
  onChangeAccommodationDurationDay,
  onChangeAccommodationCity,
  onChangeDepartDate,
  onChangeSelectCountry,
  onChangeAccommodationAddress,
  onChangeDepartPort,
  onChangeHadVisit,
  onChangeDidApply,
  onChangePartOfTour,
  onChangeTransportMode,
  onChangeTransportVehicleCode,
  onChangeAccommodationType,
  onChangeAccommodationName,
}: TravelInformationProps) => {
  return (
    <Box>
      {/* Travel Information */}
      <FormContainer title="Travel Information">
        <Box sx={{ p: 1 }}>
          Applicant should not apply for visa more than 3 months before the date of
          intended arrival.
        </Box>
        <InputContainer width={100}>
          <DatePickerComponent
            title="Intended date of arrival"
            onChange={onChangeArrivalDate}
            value={data.travelInfo.arrivalDate}
          />
          <DatePickerComponent
            title="Intended date of departure "
            onChange={onChangeDepartDate}
            value={data.travelInfo.departureDate}
          />
        </InputContainer>
        <InputContainer width={66.6}>
          <Box sx={{ p: 1 }}>Duration of stay (Days):: day(s)</Box>
        </InputContainer>

        <InputContainer width={50}>
          <AutoCompleteForm
            title="Country / Territory ( Last port of embarkation )"
            inputData={travelInformationEntries.travelInfo.country}
            placeHolder="Select your Country / Territory"
            onChange={onChangeSelectCountry}
            value={data.travelInfo.country}
          />
        </InputContainer>

        <InputContainer width={50}>
          <SelectDepartPort
            title="Port of arrival"
            value={data.travelInfo.arrivalPort}
            onChange={onChangeDepartPort}
          />
        </InputContainer>

        <InputContainer width={100}>
          <AutoCompleteForm
            title="Mode of transport"
            inputData={vehicle.values}
            value={data.travelInfo.transportMode}
            onChange={onChangeTransportMode}
            placeHolder="Select your transportation Mode"
          />
        </InputContainer>

        <InputContainer width={100}>
          <TextFieldApply
            title={vehicle.title}
            onChange={onChangeTransportVehicleCode}
            placeholder={`Enter your ${vehicle.placeholder}`}
            requiredMasked={true}
          />
        </InputContainer>

        <InputContainer width={50} direction="column">
          <SwithYesNo
            content="Have you ever visited this Country ?"
            onChange={onChangeHadVisit}
            checked={data.travelInfo.hadVisited}
          />
          <SwithYesNo
            onChange={onChangeDidApply}
            checked={data.travelInfo.didApply}
            content="Have you ever applied for this Country visa?"
          />
          <SwithYesNo
            checked={data.travelInfo.partOfTour}
            onChange={onChangePartOfTour}
            content="Are you travelling as part of a tour group ?"
          />
        </InputContainer>
      </FormContainer>

      <FormContainer title="Accommodation in Thailand">
        <InputContainer width={100}>
          <RadioComponent
            labels={travelInformationEntries.Accommodation.accommodationType}
            onChange={onChangeAccommodationType}
            title="Accommodation Type"
          />
        </InputContainer>

        <AccommodationForm
          onChangeName={onChangeAccommodationName}
          onChangeAddress={onChangeAccommodationAddress}
          onChangeCity={onChangeAccommodationCity}
          onChangePhone={onChangeAccommodationPhone}
          onChangeDurationDay={onChangeAccommodationDurationDay}
          data={data.Accommodation.AccommodationInfo[0]}
        />

        {data.Accommodation.additionalAccommodation == true && (
          <AccommodationForm
            onChangeName={onChangeAccommodationName}
            onChangeAddress={onChangeAccommodationAddress}
            onChangeCity={onChangeAccommodationCity}
            onChangePhone={onChangeAccommodationPhone}
            onChangeDurationDay={onChangeAccommodationDurationDay}
            data={data.Accommodation.AccommodationInfo[1]}
          />
        )}
      </FormContainer>
    </Box>
  );
};

export default TravelInformation;

interface AccommodationFormProps {
  onChangeAddress: EventTextField;
  onChangeName: EventTextField;
  onChangeCity: EventSelect;
  onChangePhone: EventTextField;
  onChangeDurationDay: EventTextField;
  data: AccommodationInputDto;
}

const AccommodationForm = ({
  onChangeName,
  onChangeCity,
  onChangeAddress,
  onChangePhone,
  onChangeDurationDay,
  data,
}: AccommodationFormProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <InputContainer>
        <TextFieldApply
          title="Accommodation Name"
          placeholder="Enter your Accommodation Name"
          onChange={onChangeName}
          requiredMasked={true}
        />
      </InputContainer>

      <InputContainer>
        <TextFieldApply
          title="Street Address"
          placeholder="Enter your Street Address"
          onChange={onChangeAddress}
          requiredMasked={true}
        />
        <AutoCompleteForm
          title="City"
          inputData={["1", "2"]}
          onChange={onChangeCity}
          value={data.city}
          placeHolder="Select your city"
        />
      </InputContainer>
      <InputContainer width={50}>
        <MobileTextField value={data.contactNo} onChange={onChangePhone} />
      </InputContainer>

      <InputContainer>
        <TextFieldApply
          title="Duration of stay (Days): "
          placeholder="Enter your Duration of stay"
          onChange={onChangeDurationDay}
          requiredMasked={true}
          type="number"
        />
      </InputContainer>
    </Box>
  );
};
