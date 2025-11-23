import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { convertToLabel } from "@/app/libs/convertLabel";
import { useMobileMedia } from "@/app/contexts/mobileResponsiveProvider";

interface AutoCompleteFormProps {
  title: string;
  inputData: string[];
  onChange: (e: SelectChangeEvent, name: string) => void;
  value: string;
  placeHolder: string;
  disabled?: boolean;
  name: string;
}

const AutoCompleteForm = ({
  title,
  inputData,
  onChange,
  value,
  placeHolder,
  disabled = false,
  name,
}: AutoCompleteFormProps) => {
  const { matches } = useMobileMedia();

  return (
    <Box sx={{ p: matches ? 0.5 : 1.5, width: "100%" }}>
      <FormControl fullWidth>
        <Box
          sx={{ fontWeight: 900, mb: 1, fontSize: matches ? "0.8rem" : "1rem" }}
        >
          {title}
          <span
            style={{
              fontWeight: 1000,
              color: "red",
              marginLeft: matches ? "1px" : "2px",
            }}
          >
            *
          </span>
        </Box>
        <Select
          name={name}
          disabled={disabled}
          sx={{
            height: matches ? "30px" : "40px",
            fontSize: matches ? "0.7rem" : "1rem",
          }}
          fullWidth
          displayEmpty
          required
          onChange={(e) => onChange(e, name)}
          value={convertToLabel(value)}
          renderValue={(selected) => {
            if (
              selected === null ||
              selected === "" ||
              selected === undefined
            ) {
              return <em>{placeHolder}</em>;
            }
            return selected;
          }}
        >
          {inputData.length !== 0 ? (
            inputData.map((label) => {
              return (
                <MenuItem value={convertToLabel(label)} key={label}>
                  {convertToLabel(label)}
                </MenuItem>
              );
            })
          ) : (
            <Box
              sx={{
                m: "auto",
                p: 2,
                display: "flex",
                justifyContent: "center",
                height: "30vh",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
export default AutoCompleteForm;
