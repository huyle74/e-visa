import { Button, Box, IconButton, Tooltip } from "@mui/material";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

interface ButtonProps {
  disabledDashboard?: boolean;
  disableAccountButton?: boolean;
  userName?: string;
}

const ButtonMenuDashboard = ({
  disabledDashboard = false,
  disableAccountButton = false,
  userName,
}: ButtonProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto", pr: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        disabled={disabledDashboard}
        sx={{ mr: 1, fontWeight: 1000 }}
      >
        DASHBOARD
      </Button>
      <Tooltip title="Account">
        <Button startIcon={<ManageAccountsRoundedIcon />} variant="outlined">
          {userName}
        </Button>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton disabled={disableAccountButton}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ButtonMenuDashboard;
