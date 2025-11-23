import { Box, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { primary } from "@/app/libs/color-config";
import { useMobileMedia } from "@/app/contexts/mobileResponsiveProvider";

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
  const { matches } = useMobileMedia();

  return (
    <Box
      sx={{
        mt: 3,
        backgroundColor: "white",
        width: `${width}%`,
        height: "100%",
        position: "relative",
        border: "1px solid",
        borderColor: primary,
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
          flexDirection: matches ? "column" : "row",
        }}
      >
        <p>{title}</p>
        <p
          style={{
            fontSize: matches ? "0.8rem" : "1rem",
            marginTop: matches ? "10px" : undefined,
          }}
        >
          {note}
        </p>
      </Box>
      <Box sx={{ height: "100%", p: 1 }}>{children}</Box>
    </Box>
  );
};

export default FormContainer;
