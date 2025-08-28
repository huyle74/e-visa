import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ButtonMenuHomePage from "./menu-button-home";
import LogoTitle from "./logo_name";
import { white } from "@/app/libs/color-config";

interface HeaderMenuProps {
  loginDisable?: boolean;
  createAccDisable?: boolean;
  displayDashboard?: boolean;
  dashboardDisable?: boolean;
}

export default function HeaderMenu({
  loginDisable = false,
  createAccDisable = false,
  displayDashboard = false,
  dashboardDisable = true,
}: HeaderMenuProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "13vh",
        backgroundColor: white,
        pl: 1,
      }}
    >
      <LogoTitle />
      <ButtonMenuHomePage
        disabledCreateAccount={createAccDisable}
        disabledSignIn={loginDisable}
        loggedIn={displayDashboard}
      />
    </Box>
  );
}
