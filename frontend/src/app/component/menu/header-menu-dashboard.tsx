import { Box } from "@mui/material";
import LogoTitle from "./logo_name";
import ButtonMenuDashboard from "./menu-button-dashboard";
import { white } from "@/app/libs/color-config";

const MenuDashboard = ({ userName }: { userName?: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "13vh",
        backgroundColor: white,
        pl: 2,
      }}
    >
      <LogoTitle />
      <ButtonMenuDashboard userName={userName} />
    </Box>
  );
};

export default MenuDashboard;
