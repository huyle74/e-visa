"use client";
import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material";
import { primary } from "../libs/color-config";

const theme = createTheme({
  palette: {
    primary: { main: primary, contrastText: "#F7F8F3" },
    secondary: {
      main: "#F7444E",
      dark: "#ba000d",
      contrastText: "#F7F8F3",
      light: "#21706b",
    },
    success: { main: "#78BCC4", dark: "#21706b", contrastText: "#21706b" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "900",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: "40px",
        },
      },
    },
  },
});

export default theme;
