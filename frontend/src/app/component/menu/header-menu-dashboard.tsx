import { Box } from "@mui/material";
import LogoTitle from "./logo_name";
import ButtonMenuDashboard from "./menu-button-dashboard";

const MenuDashboard = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "13vh", backgroundColor: "#F7F8F3" }}>
      <LogoTitle />
      <ButtonMenuDashboard />
    </Box>
  );
};

export default MenuDashboard;
