"use client";

import { Box, Button, Stack, IconButton } from "@mui/material";
import MenuDashboard from "../component/menu/header-menu-dashboard";
import StateBar from "../component/apply/state-bar";
import Footer from "../component/footer/footer";

const Dashboard = () => {
  return (
    <Box>
      <MenuDashboard />
      <StateBar />
      <Footer />
    </Box>
  );
};

export default Dashboard;
