"use client";

import { Skeleton, Box } from "@mui/material";
import MenuDashboard from "../component/menu/header-menu-dashboard";
import { AuthProvider } from "../contexts/authProvider";

import Footer from "../component/footer/footer";

export default function Loading() {
  return (
    <AuthProvider>
      <MenuDashboard />
      <Box sx={{ m: "auto", width: "70%" }}>
        <Skeleton animation="pulse" height={60} />
        <Skeleton animation="pulse" height={60} />
        <Skeleton animation="pulse" height={60} />
        <Skeleton animation="pulse" height={60} />
        <Skeleton />
      </Box>
      <Footer />
    </AuthProvider>
  );
}
