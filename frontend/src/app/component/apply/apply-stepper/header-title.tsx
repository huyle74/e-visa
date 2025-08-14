import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import type { } from "@mui/lab/themeAugmentation";
import { Box, IconButton, Stack, Step, StepConnector, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { FC, ReactElement } from "react";

const steps = [
  "Check your eligibility",
  "Applicant Information",
  "Travel Information",
  "Supporting documents",
  "Payment",
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          "linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 8%, rgba(252, 176, 69, 1) 65%)",
      },
    },
  ],
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const iconObj: Record<number, ReactElement> = Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => [
      i + 1,
      <div key={i} style={{ fontWeight: 900, fontSize: "1.3rem" }}>
        {i + 1}
      </div>,
    ])
  );
  const icons: { [index: string]: React.ReactElement<unknown> } = {
    ...iconObj,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <DoneOutlineIcon /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
interface Data {
  data: { title: string; activeStep: number };
  onClick: () => void;
}

const HeaderTitleApplyStepper: FC<Data> = ({ data, onClick }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <IconButton onClick={onClick}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ fontWeight: 900 }}>{data.title}</Box>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Stepper activeStep={data.activeStep} alternativeLabel connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <p style={{ fontSize: "1rem", fontWeight: 900 }}>{label}</p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default HeaderTitleApplyStepper;
