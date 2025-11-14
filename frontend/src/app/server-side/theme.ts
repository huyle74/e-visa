"use client";
import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material";
import { primary, white } from "../libs/color-config";
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: primary, contrastText: "#F7F8F3" },
    secondary: {
      main: "#F7444E",
      dark: "#ba000d",
      contrastText: "#F7F8F3",
      light: "#21706b",
    },
    success: { main: green[600], dark: green[200], contrastText: white },
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
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
