"use client";

import { Box } from "@mui/material";
import HeaderMenu from "../component/menu/header-menu";
import CreateAccoutForm from "../component/form/createAccountForm";
import Footer from "../component/footer/footer";

export default function Signup() {
  const handleSumbitForm = () => {};

  return (
    <Box>
      <HeaderMenu createAccDisable={true} />
      <CreateAccoutForm submit={handleSumbitForm} />
      <Footer />
    </Box>
  );
}
