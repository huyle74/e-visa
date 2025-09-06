import { ChangeEvent } from "react";
import {
  Radio,
  Box,
  RadioGroup,
  FormControlLabel,
  styled,
  RadioProps,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

const primary = teal[800];

interface SelectPortProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  value: string;
  name: string;
}

const SelectDepartPort = ({ title, onChange, value, name }: SelectPortProps) => {
  const labelConvert = [
    {
      value: "Land",
      labelIcon: <DirectionsCarIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      value: "Sea",
      labelIcon: <DirectionsBoatIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      value: "Flight",
      labelIcon: <FlightIcon color="primary" sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box sx={{ p: 1.5, width: "100%" }}>
      <Box sx={{ fontWeight: 900, mb: 1 }}>
        {title}
        <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>*</span>
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <RadioGroup row onChange={onChange} value={value} name={name}>
          {labelConvert.map((label) => {
            return (
              <FormControlLabel
                key={label.value}
                value={label.value}
                control={<BpRadio />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "80px",
                      justifyContent: "center",
                    }}
                  >
                    {label.labelIcon}
                    <p style={{ marginTop: "5px", color: primary }}>{label.value}</p>
                  </Box>
                }
                sx={{
                  border: "1px gray solid",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "0.8rem",
                  ml: 1,
                  height: "130px",
                  width: "100px",
                  justifyContent: "flex-start",
                  mt: 0.5,
                }}
              />
            );
          })}
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default SelectDepartPort;

const BpIcon = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: 25,
  height: 25,
  boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "white",

  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: primary,
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "flex",
    width: 20,
    height: 20,
    backgroundImage: "white",
    content: '"✓"',
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 1000,
  },
  "input:hover ~ &": {
    backgroundColor: teal[700],
  },
});

function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
