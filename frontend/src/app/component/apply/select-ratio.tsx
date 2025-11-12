import { Radio, FormControlLabel, RadioGroup, Box } from "@mui/material";
import { ChangeEvent } from "react";

interface RadioComponProps {
  labels: string[];
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    name: string,
    index?: number
  ) => void;
  title: string;
  name: string;
  value?: string;
  disabled?: boolean;
}

const RadioComponent = ({
  labels,
  onChange,
  title,
  name,
  value,
  disabled,
}: RadioComponProps) => {
  return (
    <Box sx={{ p: 1.5 }}>
      <Box sx={{ fontWeight: 900, mb: 1 }}>
        {title}
        <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>
          *
        </span>
      </Box>
      <RadioGroup row onChange={onChange} name={name} value={value}>
        {labels.map((label) => {
          return (
            <FormControlLabel
              value={label}
              control={<Radio />}
              label={label}
              key={label}
              disabled={disabled}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default RadioComponent;
