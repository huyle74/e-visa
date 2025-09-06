import { Box } from "@mui/material";
import { teal } from "@mui/material/colors";
import { ReactNode } from "react";
import { primary } from "@/app/libs/color-config";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  note?: string;
  width?: number;
}

const FormContainer = ({
  children,
  title,
  note = "",
  width = 100,
}: FormContainerProps) => {
  return (
    <Box
      sx={{
        mt: 3,
        backgroundColor: "white",
        width: `${width}%`,
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: primary,
          color: "white",
          p: 2,
          fontWeight: 900,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>{title}</p>
        <p>{note}</p>
      </Box>
      <Box sx={{ border: "1px solid", borderColor: primary, height: "100%", p: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default FormContainer;
