import { Radio, FormControlLabel, RadioGroup, Box } from "@mui/material";
import { ChangeEvent } from "react";

interface RadioComponProps {
  labels: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const RadioComponent = ({ labels, onChange, title }: RadioComponProps) => {
  return (
    <Box sx={{ p: 1.5 }}>
      <Box sx={{ fontWeight: 900, mb: 1 }}>
        {title}
        <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>*</span>
      </Box>
      <RadioGroup row onChange={onChange}>
        {labels.map((label) => {
          return (
            <FormControlLabel
              value={label}
              control={<Radio />}
              label={label}
              key={label}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default RadioComponent;
