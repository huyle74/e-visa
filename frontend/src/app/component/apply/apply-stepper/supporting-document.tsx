import { Box } from "@mui/material";
import AutoCompleteForm from "../autocompleteForm";
import TextFieldApply from "../textField";
import InputContainer from "../input-containter";
import FormContainer from "../containerForm";
import FileInput from "../fileInput";

const SupportingDocument = () => {
  return (
    <Box>
      <FormContainer
        title="Supporting documents."
        note="(.JPG .JPEG .PDF file, Limit Size is 3 MB)"
      >
        <InputContainer>
          <FileInput title="1 . Biodata page of Passport or Travel Document" />
        </InputContainer>
      </FormContainer>
    </Box>
  );
};

export default SupportingDocument;
