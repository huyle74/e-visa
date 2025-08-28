import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

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
          value={value}
          renderValue={(selected) => {
            if (selected === null || selected === "") {
              return <em>{placeHolder}</em>;
            }
            return selected;
          }}
        >
          {inputData.map((label) => {
            return (
              <MenuItem value={label} key={label}>
                {displayLabel(label)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default AutoCompleteForm;

const displayLabel = (label: string) => {
  const splited = label.toLowerCase().split("_");

  const result =
    splited[0][0].toUpperCase() + splited[0].slice(1) + " " + splited.slice(1);
  return result;
};
