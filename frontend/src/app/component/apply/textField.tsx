import { ChangeEvent } from "react";
import { Box, TextField, styled, useMediaQuery } from "@mui/material";
import { primary } from "@/app/libs/color-config";

interface TextFieldProps {
  title: string;
  placeholder: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
    index?: number
  ) => void;
  requiredMasked?: boolean;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  value?: string;
  disabled?: boolean;
}

const TextFieldApply = ({
  title,
  placeholder,
  onChange,
  requiredMasked = false,
  type,
  name,
  value,
  disabled,
}: TextFieldProps) => {
  const matches = useMediaQuery("(max-width:600px)");

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
    "& .MuiInputBase-input::placeholder": {
      opacity: 0.8,
      fontStyle: "italic",
      fontSize: matches ? "0.8rem" : "1rem",
    },
  });

  return (
    <Box sx={{ width: "100%", p: matches ? 0.5 : 1.5 }}>
      <Box
        sx={{ mb: 1, fontWeight: 900, fontSize: matches ? "0.8rem" : "1rem" }}
      >
        {title}
        {requiredMasked && (
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}>
            *
          </span>
        )}
      </Box>
      <Box
        sx={{
          height: matches ? "30px" : "40px",
          border: "1px solid rgb(194, 194, 194)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          overflow: "hidden",
          borderRadius: "4px",
          "&:focus-within": { borderColor: "#6F7E8C" },
          "&:hover": { borderColor: primary },
          fontSize: matches ? "0.7rem" : "1rem",
        }}
      >
        <CssTextField
          placeholder={placeholder}
          onChange={(e) => onChange(e, name)}
          fullWidth
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          sx={{ fontSize: matches ? "0.7rem" : "1rem" }}
        />
      </Box>
    </Box>
  );
};

export default TextFieldApply;
