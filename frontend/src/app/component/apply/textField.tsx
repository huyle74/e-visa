import { ChangeEvent } from "react";
import { Box, TextField, styled } from "@mui/material";
import { teal } from "@mui/material/colors";
const primary = teal[800];

interface TextFieldProps {
  title: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  requiredMasked?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

const TextFieldApply = ({
  title,
  placeholder,
  onChange,
  requiredMasked = false,
  type,
}: TextFieldProps) => {
  return (
    <Box sx={{ width: "100%", p: 1.5 }}>
      <Box sx={{ mb: 1, fontWeight: 900 }}>
        {title}
        {requiredMasked && (
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}>*</span>
        )}
      </Box>
      <Box
        sx={{
          height: "40px",
          border: "1px solid rgb(194, 194, 194)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          overflow: "hidden",
          borderRadius: "4px",
          "&:focus-within": { borderColor: "#6F7E8C" },
          "&:hover": { borderColor: primary },
        }}
      >
        <CssTextField
          placeholder={placeholder}
          onChange={onChange}
          fullWidth
          type={type}
        />
      </Box>
    </Box>
  );
};

export default TextFieldApply;

const CssTextField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    zIndex: 0,
    display: "flex",
    alignItems: "center",
    height: "100%",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
