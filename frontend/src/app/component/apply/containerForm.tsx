import { Box } from "@mui/material";
import { teal } from "@mui/material/colors";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  title: string;
}

const primary = teal[800];

const FormContainer = ({ children, title }: FormContainerProps) => {
  return (
    <Box sx={{ mt: 3, backgroundColor: "white", width: "100%", height: "100%", position: "relative" }}>
      <Box sx={{ backgroundColor: primary, color: "white", p: 2, fontWeight: 900 }}>{title}</Box>
      <Box sx={{ border: "1px solid", borderColor: primary, height: "100%" }}>{children}</Box>
    </Box>
  );
};

export default FormContainer;
