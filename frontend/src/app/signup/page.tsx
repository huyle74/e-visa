"use client";

import { CountriesProvider } from "../contexts/countriesProvider";
import HeaderMenu from "../component/menu/header-menu";
import CreateAccoutForm from "../component/form-account/createAccountForm";
import Footer from "../component/footer/footer";

export default function Signup() {
  return (
    <CountriesProvider>
      <HeaderMenu createAccDisable={true} loginDisable={false} logged={false} />
      <CreateAccoutForm />
      <Footer />
    </CountriesProvider>
  );
}
