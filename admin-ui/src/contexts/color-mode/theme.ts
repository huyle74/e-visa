import { createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

export const primary = blue[700];
export const secondary = blue[400];
export const success = orange[900];
export const white = "#FFFFFF";

export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
