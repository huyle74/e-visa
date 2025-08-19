import { Box, FormControl, MenuItem, Select, SelectProps } from "@mui/material";

interface AutoCompleteFormProps {
  title: string;
  inputData: string[];
  onChange: SelectProps<string>["onChange"];
  value: string;
  placeHolder: string;
}

const AutoCompleteForm = ({
  title,
  inputData,
  onChange,
  value,
  placeHolder,
}: AutoCompleteFormProps) => {
  return (
    <Box sx={{ p: 1.5, width: "100%"}}>
      <FormControl fullWidth>
        <Box sx={{ fontWeight: 900, mb: 1 }}>
          {title}
          <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>*</span>
        </Box>
        <Select
          sx={{ height: "40px" }}
          fullWidth
          displayEmpty
          //   required
          onChange={onChange}
          value={value}
          renderValue={(selected) => {
            if (selected == "") {
              return <em>{placeHolder}</em>;
            }
            return selected;
          }}
        >
          {inputData.map((label) => {
            return (
              <MenuItem value={label} key={label}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default AutoCompleteForm;

