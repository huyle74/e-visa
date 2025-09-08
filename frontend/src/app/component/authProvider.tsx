import { useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { backend_url } from "../server-side/envLoader";
import { deleteUserInfo } from "../libs/getLocalStorage";

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
        await axios.post(endpoint, { accessToken });
      } catch (error: any) {
        console.log(error);
        deleteUserInfo();
        router.push("/login");
      }
    })();
  }, []);

  return <Box>{children}</Box>;
};

export default AuthProvider;
