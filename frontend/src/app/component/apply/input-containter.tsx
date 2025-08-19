import { ReactNode } from "react";
import { Box } from "@mui/material";

interface InputContainerProps {
  children: ReactNode;
  width?: number;
  direction?: string;
}

const InputContainer = ({
  children,
  width = 100,
  direction = "row",
}: InputContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: `${width}%`,
        mb: 0,
        flexDirection: `${direction}`,
        position: "relative",
        height: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default InputContainer;
