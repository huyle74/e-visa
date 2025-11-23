import { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteUserInfo } from "@/app/libs/getLocalStorage";
import { useMobileMedia } from "@/app/contexts/mobileResponsiveProvider";

import styles from "./header.module.css";

interface ButtonMenuProps {
  disabledSignIn?: boolean;
  disabledCreateAccount?: boolean;
  loggedIn?: boolean;
  userName?: string;
}

const ButtonMenuHomePage = ({
  loggedIn = false,
  disabledSignIn = false,
  disabledCreateAccount = false,
  userName,
}: ButtonMenuProps) => {
  const { matches } = useMobileMedia();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    deleteUserInfo();

    window.location.replace("/");
    handleClose();
  };

  return (
    <Box className={styles.buttonContainer}>
      {loggedIn ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box className={styles.welcomeUser}>Welcome {userName} !</Box>
          <Box className={styles.button}>
            <Button variant="contained" href="/dashboard" color="secondary">
              DASHBOARD
            </Button>
          </Box>
          <Tooltip title="Logout">
            <IconButton
              size={matches ? "small" : "large"}
              onClick={handleOpen}
              color="primary"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Box className={styles.button}>
            <Button disabled={disabledSignIn} variant="outlined" href="/login">
              SIGN IN
            </Button>
          </Box>
          <Box className={styles.button}></Box>
          <Button
            variant="contained"
            href="/signup"
            disabled={disabledCreateAccount}
          >
            CREATE ACCOUNT
          </Button>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to log out?
          </Typography>
          <Box sx={{ pt: 3, ml: "auto" }}>
            <Button variant="contained" sx={{ mr: 1 }} onClick={handleLogout}>
              Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonMenuHomePage;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
