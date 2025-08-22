import { ChangeEvent, DragEvent } from "react";
import { Box } from "@mui/material";
import InputContainer from "../input-containter";
import FormContainer from "../containerForm";
import FileInput from "../fileInput";
import { SupportingDocumentInputDto } from "@/app/libs/types";

type EventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type EventDrop = (e: DragEvent<HTMLInputElement>) => void;

interface SupportingDocumentProps {
  data: SupportingDocumentInputDto;
  onChangeFileBiodata: EventInput;
  onChangeFilePhoto: EventInput;
  onChangeFileLocation: EventInput;
  onChangeFileTravelBooking: EventInput;
  onChangeFileAccomodationProof: EventInput;
  onChangeFileFinancialEvidence: EventInput;

  handleDropFileBioData: EventDrop;
  handleDropFilePhoto: EventDrop;
  handleDropFileLocation: EventDrop;
  handleDropFileTravelBooking: EventDrop;
  handleDropFileAccomodationProof: EventDrop;
  handleDropFileFinancialEvidence: EventDrop;
}

const SupportingDocument = ({
  data,
  onChangeFileBiodata,
  onChangeFilePhoto,
  onChangeFileLocation,
  onChangeFileTravelBooking,
  onChangeFileAccomodationProof,
  onChangeFileFinancialEvidence,

  handleDropFileBioData,
  handleDropFilePhoto,
  handleDropFileLocation,
  handleDropFileTravelBooking,
  handleDropFileAccomodationProof,
  handleDropFileFinancialEvidence,
}: SupportingDocumentProps) => {
  return (
    <Box>
      <FormContainer
        title="Supporting documents."
        note="(.JPG .JPEG .PDF file, Limit Size is 3 MB)"
      >
        <InputContainer>
          <FileInput
            title="1 . Biodata page of Passport or Travel Document"
            onChange={onChangeFileBiodata}
            fileValue={data.biodata}
            handleDropFile={handleDropFileBioData}
          />
        </InputContainer>
        <InputContainer>
          <FileInput
            title="2 . Photograph taken within the last six months"
            onChange={onChangeFilePhoto}
            fileValue={data.photograph}
            handleDropFile={handleDropFilePhoto}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="3 . Document indicating current location"
            onChange={onChangeFileLocation}
            fileValue={data.currentLocation}
            handleDropFile={handleDropFileLocation}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="4 . Travel booking confirmation"
            onChange={onChangeFileTravelBooking}
            fileValue={data.bookingConfirmation}
            handleDropFile={handleDropFileTravelBooking}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="5. Proof of accommodation"
            onChange={onChangeFileAccomodationProof}
            fileValue={data.proofOfAccommodation}
            handleDropFile={handleDropFileAccomodationProof}
          />
        </InputContainer>

        <InputContainer>
          <FileInput
            title="6 . Financial evidence (e.g., bank statements for the last three months, sponsorship letter)"
            onChange={onChangeFileFinancialEvidence}
            fileValue={data.biodata}
            handleDropFile={handleDropFileFinancialEvidence}
          />
        </InputContainer>
      </FormContainer>
    </Box>
  );
};

export default SupportingDocument;
