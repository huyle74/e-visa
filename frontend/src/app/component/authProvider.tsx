import { useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { backend_url } from "../server-side/envLoader";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const endpoint = backend_url + "api" + "/guard";

  useEffect(() => {
    (async () => {
      try {
        const storage = localStorage.getItem("app:user") || "";
        if (!storage) {
          router.push("/login");
          return;
        }
        const results = JSON.parse(storage);
        const accessToken = results?.accessToken;
        const response = await axios.post(endpoint, { accessToken });

        if (response.data.success === "Error") {
          router.push("/login");
        }
      } catch (error: any) {
        console.log(error);
        router.push("/login");
      }
    })();
  }, []);

  return <Box>{children}</Box>;
};

export default AuthProvider;
