import { useState } from "react";
import {
  Button,
  Box,
  IconButton,
  Tooltip,
  Modal,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useAuth } from "../../contexts/authProvider";

interface ButtonProps {
  disabledDashboard?: boolean;
  disableAccountButton?: boolean;
}

const ButtonMenuDashboard = ({
  disabledDashboard = false,
  disableAccountButton = false,
}: ButtonProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    setLoading(true);
    logout();
    router.push("/");
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", marginLeft: "auto", pr: 2 }}
    >
      <Button
        variant="contained"
        color="secondary"
        disabled={disabledDashboard}
        sx={{ mr: 1, fontWeight: 1000 }}
        onClick={() => router.push("/dashboard")}
      >
        DASHBOARD
      </Button>
      <Tooltip title="Account">
        <Button startIcon={<ManageAccountsRoundedIcon />} variant="outlined">
          {user?.lastName}
        </Button>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton disabled={disableAccountButton} onClick={handleOpen}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </Tooltip>
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
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={handleLogout}
              loading={loading}
            >
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

export default ButtonMenuDashboard;

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
