import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { convertToLabel } from "@/app/libs/convertLabel";

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
  return (
    <Box sx={{ p: 1.5, width: "100%" }}>
      <FormControl fullWidth>
        <Box sx={{ fontWeight: 900, mb: 1 }}>
          {title}
          <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>*</span>
        </Box>
        <Select
          name={name}
          disabled={disabled}
          sx={{ height: "40px" }}
          fullWidth
          displayEmpty
          required
          onChange={(e) => onChange(e, name)}
          value={convertToLabel(value)}
          renderValue={(selected) => {
            if (selected === null || selected === "" || selected === undefined) {
              return <em>{placeHolder}</em>;
            }
            return selected;
          }}
        >
          {inputData.map((label) => {
            return (
              <MenuItem value={convertToLabel(label)} key={label}>
                {convertToLabel(label)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default AutoCompleteForm;
