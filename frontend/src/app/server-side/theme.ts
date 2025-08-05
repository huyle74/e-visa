"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#4caf50", contrastText: "#FFFADC" },
    secondary: { main: "#FFFADC", dark: "#FFFADC", contrastText: "#000", light: "#ff7961" },
    success: { main: "#FFFADC" },
  },
});

export default theme;
