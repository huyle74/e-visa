import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ButtonMenuHomePage from "./menu-button-home";
import LogoTitle from "./logo_name";

interface HeaderMenuProps {
  loginDisable?: boolean;
  createAccDisable?: boolean;
  displayDashboard?: boolean;
  dashboardDisable?: boolean;
}

export default function HeaderMenu({ loginDisable = false, createAccDisable = false, displayDashboard = true, dashboardDisable = false }: HeaderMenuProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "13vh", backgroundColor: "#F7F8F3" }}>
      <LogoTitle />
      <ButtonMenuHomePage disabledCreateAccount={createAccDisable} disabledSignIn={loginDisable} loggedIn={displayDashboard} />
    </Box>
  );
}
