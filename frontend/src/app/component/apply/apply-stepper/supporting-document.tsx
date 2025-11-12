import { ChangeEvent, DragEvent, MouseEventHandler } from "react";
import { Box } from "@mui/material";
import InputContainer from "../input-containter";
import FormContainer from "../containerForm";
import FileInput from "../fileInput";
import { SupportingDocumentInputDto } from "@/app/libs/types";
import ButtonSumbit from "../button-submit-group";

type EventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type EventDrop = (e: DragEvent<HTMLInputElement>) => void;

interface SupportingDocumentProps {
  data: SupportingDocumentInputDto;
  onChangeFileBiodata: EventInput;
  onChangeFilePhoto: EventInput;
  onChangeFileLocation: EventInput;
  onChangeFileTravelBooking: EventInput;
  onChangeFileAccommodationProof: EventInput;
  onChangeFileFinancialEvidence: EventInput;

  handleDropFileBioData: EventDrop;
  handleDropFilePhoto: EventDrop;
  handleDropFileLocation: EventDrop;
  handleDropFileTravelBooking: EventDrop;
  handleDropFileAccommodationProof: EventDrop;
  handleDropFileFinancialEvidence: EventDrop;

  loading: boolean;

  onClickNext: MouseEventHandler<HTMLButtonElement>;
}

const SupportingDocument = ({
  data,
  onChangeFileBiodata,
  onChangeFilePhoto,
  onChangeFileLocation,
  onChangeFileTravelBooking,
  onChangeFileAccommodationProof,
  onChangeFileFinancialEvidence,

  handleDropFileBioData,
  handleDropFilePhoto,
  handleDropFileLocation,
  handleDropFileTravelBooking,
  handleDropFileAccommodationProof,
  handleDropFileFinancialEvidence,
  onClickNext,
  loading,
}: SupportingDocumentProps) => {
  return (
    <Box>
      <FormContainer
        title="Supporting documents."
        note="(.JPG .JPEG .PDF file, Limit Size is 5 MB)"
      >
        <InputContainer>
          <FileInput
            title="1 . Biodata page of Passport or Travel Document"
            onChange={onChangeFileBiodata}
            fileValue={data.BIODATA}
            handleDropFile={handleDropFileBioData}
            name="BIODATA"
            disabled={data.completed}
          />
        </InputContainer>
        <InputContainer>
          <FileInput
            title="2 . Photograph taken within the last six months"
            onChange={onChangeFilePhoto}
            fileValue={data.PHOTOGRAPH}
            handleDropFile={handleDropFilePhoto}
            name="PHOTOGRAPH"
            disabled={data.completed}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="3 . Document indicating current location"
            onChange={onChangeFileLocation}
            fileValue={data.CURRENT_LOCATION}
            handleDropFile={handleDropFileLocation}
            name="CURRENT_LOCATION"
            disabled={data.completed}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="4 . Travel booking confirmation"
            onChange={onChangeFileTravelBooking}
            fileValue={data.BOOKING_CONFIRMATION}
            handleDropFile={handleDropFileTravelBooking}
            name="BOOKING_CONFIRMATION"
            disabled={data.completed}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="5. Proof of accommodation"
            onChange={onChangeFileAccommodationProof}
            fileValue={data.PROOF_OF_ACCOMMODATION}
            handleDropFile={handleDropFileAccommodationProof}
            name="PROOF_OF_ACCOMMODATION"
            disabled={data.completed}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="6 . Financial evidence (e.g., bank statements for the last three months, sponsorship letter)"
            onChange={onChangeFileFinancialEvidence}
            fileValue={data.FINANCIAL_EVIDENCE}
            handleDropFile={handleDropFileFinancialEvidence}
            name="FINANCIAL_EVIDENCE"
            disabled={data.completed}
          />
        </InputContainer>
      </FormContainer>
      <ButtonSumbit
        onclickNext={onClickNext}
        loading={loading}
        displayBackButton={true}
      />
    </Box>
  );
};

export default SupportingDocument;
