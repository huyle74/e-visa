import { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Modal,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteUserInfo } from "@/app/libs/getLocalStorage";

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
  const matches = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    deleteUserInfo();

    window.location.replace("/");
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        justifyContent: "space-between",
        pr: matches ? 0 : 2,
        fontWeight: 900,
      }}
    >
      {loggedIn ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // border: "red 1px solid",
          }}
        >
          <Box
            sx={{
              mr: matches ? 1 : 2,
              fontSize: matches ? "0.9rem" : "1.5rem",
            }}
          >
            Welcome {userName} !
          </Box>
          <Button
            variant="contained"
            href="/dashboard"
            color="secondary"
            sx={{
              fontWeight: 1000,
              mr: matches ? 0 : 1,
            }}
            size={matches ? "small" : "large"}
          >
            DASHBOARD
          </Button>
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
        <Box>
          <Button
            disabled={disabledSignIn}
            variant="outlined"
            href="/login"
            sx={{ fontWeight: 1000, mr: 1 }}
            size={matches ? "small" : "large"}
          >
            SIGN IN
          </Button>
          <Button
            variant="contained"
            href="/signup"
            disabled={disabledCreateAccount}
            sx={{ fontWeight: 1000, mr: 1 }}
            size={matches ? "small" : "large"}
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
