import { ChangeEvent, MouseEventHandler } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import AutoCompleteForm from "../autocompleteForm";
import FormContainer from "../containerForm";
import TextFieldApply from "../textField";
import SelectDepartPort from "../select-ratio-vehicle";
import { travelInformationEntries } from "@/app/libs/entries-input-visa";
import { Dayjs } from "dayjs";
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
import ButtonSumbit from "../button-submit-group";

type EventTextField = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  name: string
) => void;
type EventSelect = (e: SelectChangeEvent, name: string) => void;
type EventSwitch = (e: ChangeEvent<HTMLInputElement>, name: string) => void;

type AccommodationEvent = (
  e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  index: number
) => void;

interface TravelInformationProps {
  data: TravelInformationInputDto;
  vehicle: TransportationVehicleInputDto;
  onChangeArrivalDate: (e: Dayjs | null, name: string) => void;
  onChangeDepartDate: (e: Dayjs | null, name: string) => void;
  onChangeSelectCountry: EventSelect;
  onChangeArrivalPort: EventTextField;
  onChangeHadVisit: EventSwitch;
  onChangeDidApply: EventSwitch;
  onChangePartOfTour: EventSwitch;
  onChangeTransportMode: EventSelect;
  onChangeTransportVehicleCode: EventTextField;
  onChangeAccommodationType: AccommodationEvent;
  onChangeAccommodationName: AccommodationEvent;
  onChangeAccommodationAddress: AccommodationEvent;
  onChangeAccommodationCity: AccommodationEvent;
  onChangeAccommodationPhone: AccommodationEvent;
  onChangeAccommodationDurationDay: AccommodationEvent;
  onChangeAdditionalAccomodation: EventSwitch;
  onClickNext: MouseEventHandler<HTMLButtonElement>;
}

const TravelInformation = ({
  data,
  vehicle,
  onChangeArrivalDate,
  onChangeDepartDate,
  onChangeSelectCountry,
  onChangeArrivalPort,
  onChangeHadVisit,
  onChangeDidApply,
  onChangePartOfTour,
  onChangeTransportMode,
  onChangeTransportVehicleCode,
  onChangeAccommodationAddress,
  onChangeAccommodationPhone,
  onChangeAccommodationDurationDay,
  onChangeAccommodationCity,
  onChangeAccommodationType,
  onChangeAccommodationName,
  onChangeAdditionalAccomodation,
  onClickNext,
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
            onChange={(e) => onChangeArrivalDate(e, "arrivalDate")}
            value={data.arrivalDate}
            name="arrivalDate"
          />
          <DatePickerComponent
            title="Intended date of departure "
            onChange={onChangeDepartDate}
            value={data.departureDate}
            name="departureDate"
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
            onChange={(e) => onChangeSelectCountry(e, "country")}
            value={data.country}
            name="country"
          />
        </InputContainer>

        <InputContainer width={50}>
          <SelectDepartPort
            title="Port of arrival"
            value={data.arrivalPort}
            onChange={(e) => onChangeArrivalPort(e, "arrivalPort")}
            name="arrivalPort"
          />
        </InputContainer>

        <InputContainer width={100}>
          <AutoCompleteForm
            title="Mode of transport"
            inputData={vehicle.values}
            value={data.transportMode}
            onChange={onChangeTransportMode}
            placeHolder="Select your transportation Mode"
            name="transportMode"
          />
        </InputContainer>

        <InputContainer width={100}>
          <TextFieldApply
            title={vehicle.title}
            onChange={onChangeTransportVehicleCode}
            placeholder={`Enter your ${vehicle.placeholder}`}
            requiredMasked={true}
            name="vehicleNumber"
            value={data.vehicleNumber || ""}
          />
        </InputContainer>

        <InputContainer width={50} direction="column">
          <SwithYesNo
            content="Have you ever visited this Country?"
            onChange={(e) => onChangeHadVisit(e, "hadVisited")}
            checked={data.hadVisited}
          />
          <SwithYesNo
            onChange={(e) => onChangeDidApply(e, "didApply")}
            checked={data.didApply}
            content="Have you ever applied for this Country visa?"
          />
          <SwithYesNo
            checked={data.partOfTour}
            onChange={(e) => onChangePartOfTour(e, "partOfTour")}
            content="Are you travelling as part of a tour group?"
          />
        </InputContainer>
      </FormContainer>

      {/* Accommodation */}
      <FormContainer title="Accommodation in ">
        <AccommodationForm
          index={0}
          onChangeAccommodationType={onChangeAccommodationType}
          onChangeName={onChangeAccommodationName}
          onChangeAddress={onChangeAccommodationAddress}
          onChangeCity={onChangeAccommodationCity}
          onChangePhone={onChangeAccommodationPhone}
          onChangeDurationDay={onChangeAccommodationDurationDay}
          data={data.accommodations[0]}
        />

        <InputContainer>
          <SwithYesNo
            onChange={(e) => onChangeAdditionalAccomodation(e, "additionalAccommodation")}
            checked={data.additionalAccommodation}
            content="Additional accommodation in?"
          />
        </InputContainer>

        {data.additionalAccommodation === true && data.accommodations[1] && (
          <AccommodationForm
            index={1}
            onChangeAccommodationType={onChangeAccommodationType}
            onChangeName={onChangeAccommodationName}
            onChangeAddress={onChangeAccommodationAddress}
            onChangeCity={onChangeAccommodationCity}
            onChangePhone={onChangeAccommodationPhone}
            onChangeDurationDay={onChangeAccommodationDurationDay}
            data={data.accommodations[1]}
          />
        )}
      </FormContainer>
      <ButtonSumbit onclickNext={onClickNext} />
    </Box>
  );
};

export default TravelInformation;

interface AccommodationFormProps {
  onChangeAddress: AccommodationEvent;
  onChangeName: AccommodationEvent;
  onChangeCity: AccommodationEvent;
  onChangePhone: AccommodationEvent;
  onChangeDurationDay: AccommodationEvent;
  onChangeAccommodationType: AccommodationEvent;
  data: AccommodationInputDto;
  index: number;
}

const AccommodationForm = ({
  onChangeName,
  onChangeCity,
  onChangeAddress,
  onChangePhone,
  onChangeDurationDay,
  onChangeAccommodationType,
  data,
  index,
}: AccommodationFormProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <InputContainer width={100}>
        <RadioComponent
          labels={travelInformationEntries.Accommodation.accommodationType}
          onChange={(e) => onChangeAccommodationType(e, index)}
          title="Accommodation Type"
          name="type"
          value={data.type}
        />
      </InputContainer>
      <InputContainer>
        <TextFieldApply
          title="Accommodation Name"
          placeholder="Enter your Accommodation Name"
          onChange={(e) => onChangeName(e, index)}
          requiredMasked={true}
          name="name"
          value={data.name}
        />
      </InputContainer>

      <InputContainer>
        <TextFieldApply
          title="Street Address"
          placeholder="Enter your Street Address"
          onChange={(e) => onChangeAddress(e, index)}
          requiredMasked={true}
          name="street"
          value={data.street}
        />
        <AutoCompleteForm
          title="City"
          inputData={["1", "2"]}
          onChange={(e) => onChangeCity(e, index)}
          value={data.city}
          placeHolder="Select your city"
          name="city"
        />
      </InputContainer>
      <InputContainer width={50}>
        <MobileTextField
          value={data.contactNo}
          onChange={(e) => onChangePhone(e, index)}
          name="contactNo"
        />
      </InputContainer>

      <InputContainer>
        <TextFieldApply
          title="Duration of stay (Days): "
          placeholder="Enter your Duration of stay"
          onChange={(e) => onChangeDurationDay(e, index)}
          requiredMasked={true}
          type="number"
          name="duration"
          value={data.duration}
        />
      </InputContainer>
    </Box>
  );
};
