import { Box, Container, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface AutoCompleteFormProps {
  title: string;
  inputData: string[];
  onChange: (e: SelectChangeEvent) => void;
  value: string;
}

const AutoCompleteForm = ({ title, inputData, onChange, value }: AutoCompleteFormProps) => {
  return (
    <Container sx={{ p: 2 }}>
      <FormControl fullWidth>
        <Box sx={{ fontWeight: 900, mb: 2 }}>
          {title}
          <span style={{ fontWeight: 1000, color: "red" }}>*</span>
        </Box>
        <Select
          sx={{ height: "40px" }}
          fullWidth
          //   required
          onChange={onChange}
          value={value}>
          {inputData.map((label) => {
            return (
              <MenuItem
                value={label}
                key={label}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Container>
  );
};
export default AutoCompleteForm;
