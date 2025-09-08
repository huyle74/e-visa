"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import HeaderMenu from "../component/menu/header-menu";
import CreateAccoutForm from "../component/form-account/createAccountForm";
import Footer from "../component/footer/footer";
import { backend_url } from "../server-side/envLoader";

interface country {
  code: string;
  countryCode: string;
  iso2: string;
  engName: string;
}

export default function Signup() {
  const [allCountries, setAllCountries] = useState<country[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const endpoint = backend_url + "api" + "/static/countries";
        const response = await axios.get(endpoint);
        setAllCountries(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Box>
      <HeaderMenu createAccDisable={true} loginDisable={false} logged={false} />
      <CreateAccoutForm countries={allCountries} />
      <Footer />
    </Box>
  );
}
