"use client";

import { Box } from "@mui/material";
import HeaderMenu from "../component/menu/header-menu";
import SigninForm from "../component/form-account/signinForm";
import Footer from "../component/footer/footer";

export default function LoginPage() {
  const handleSumbitForm = () => {};

  return (
    <Box>
      <HeaderMenu loginDisable={true} />
      <SigninForm submit={handleSumbitForm} />
      <Footer />
    </Box>
  );
}
