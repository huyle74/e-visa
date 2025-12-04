import { Box, IconButton } from "@mui/material";
import ButtonMenuHomePage from "./menu-button-home";
import LogoTitle from "./logo_name";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "./header.module.css";

interface HeaderMenuProps {
  loginDisable?: boolean;
  createAccDisable?: boolean;
  displayDashboard?: boolean;
  dashboardDisable?: boolean;
  logged: boolean;
  userName?: string;
  notifications: NotificationsProps[];
}

type NotificationsProps = {
  id: number | string;
  title: string;
  message: string;
  createAt: Date;
  status: "READ" | "UNREAD";
};

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
      >
        <Box>
          <IconButton>
            <NotificationsIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </ButtonMenuHomePage>
    </Box>
  );
}
