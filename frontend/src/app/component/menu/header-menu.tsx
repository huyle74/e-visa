import { Box, Button } from "@mui/material";
import ButtonMenuHomePage from "./menu-button-home";
import LogoTitle from "./logo_name";
import styles from "./header.module.css";

interface HeaderMenuProps {
  loginDisable?: boolean;
  createAccDisable?: boolean;
  displayDashboard?: boolean;
  dashboardDisable?: boolean;
  logged: boolean;
  userName?: string;
}

export default function HeaderMenu({
  loginDisable = false,
  createAccDisable = false,
  displayDashboard = false,
  logged,
  userName,
}: HeaderMenuProps) {
  return (
    <Box className={styles.headerContainer}>
      <LogoTitle />
      <ButtonMenuHomePage
        disabledCreateAccount={createAccDisable}
        disabledSignIn={loginDisable}
        loggedIn={logged}
        userName={userName}
      />
    </Box>
  );
}
