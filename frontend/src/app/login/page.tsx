"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Box } from "@mui/material";
import HeaderMenu from "../component/menu/header-menu";
import SigninForm from "../component/form-account/signinForm";
import Footer from "../component/footer/footer";
import { backend_url } from "../server-side/envLoader";

const KEY = "app:user";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const handleSumbitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const endpoint = backend_url + "api/login";
    try {
      const response = await axios.post(endpoint, { email, password });

      if (response.data.success == "OK") {
        console.log(response.data);
        const data = response.data.data;
        localStorage.setItem(
          KEY,
          JSON.stringify({ ...data, lastUpdatedAt: Date.now() })
        );

        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      const message = error.response.data.message;
      console.log(message);
      setErrMessage(message);
    }
  };

  return (
    <Box>
      <HeaderMenu loginDisable={true} createAccDisable={false} />
      <SigninForm submit={handleSumbitForm} loading={loading} errorMessage={errMessage} />
      <Footer />
    </Box>
  );
}
