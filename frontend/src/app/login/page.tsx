"use client";

import { useState, useEffect } from "react";
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
  const [googleApi, setGoogleApi] = useState<string>("");

  useEffect(() => {
    const endpoint = backend_url + "api/login-google/login-url";
    (async () => {
      try {
        const response = await axios.get(endpoint);
        console.log(response.data.data);
        if (response.data) setGoogleApi(response.data.data);
      } catch (error: any) {
        console.log(error.response);
      }
    })();
  }, []);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const endpoint = backend_url + "api/login";
    try {
      const response = await axios.post(endpoint, { email, password });

      if (response.data.success == "OK") {
        const data = response.data.data;
        localStorage.setItem(KEY, JSON.stringify({ ...data, lastUpdatedAt: Date.now() }));

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
      <HeaderMenu loginDisable={true} createAccDisable={false} logged={false} />
      <SigninForm
        submit={handleSubmitForm}
        loading={loading}
        errorMessage={errMessage}
        googleApi={googleApi}
      />
      <Footer />
    </Box>
  );
}
