"use client";

import { useState, ChangeEvent, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { secondary, white, success } from "../libs/color-config";
import TextFormRow from "../component/form-account/textForm-row";
import HeaderMenu from "../component/menu/header-menu";
import PasswordFormRow from "../component/form-account/textPassword-row";
import Footer from "../component/footer/footer";
import { backend_url } from "../server-side/envLoader";

const notMatchMsg = "2 Passwords do not match";
const containedNumberMsg = "Include at least one number (0-9)";
const atLeastLetterMsg = "Your password need minimum of 8 characters";
const userNotFoundMsg = "User do not found";

export default function ForgotPassword() {
  const [user, setUser] = useState({ email: "", password: "", re_password: "" });
  const [checkEmpty, setCheckEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const router = useRouter();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    try {
      setCheckEmpty(true);
      setLoading(true);
      const check = checkPassword();
      console.log(check);
      console.log(errorMessage);
      if (!check) return;

      const endpoint = backend_url + "api" + "/forgot-password";
      const { data } = await axios.post(endpoint, user);

      if (data.success === "OK") {
        setLoading(false);
        router.push("/login");
      }
    } catch (error: any) {
      const message = error.response.data.message;
      setLoading(false);
      handleErrorMessage(message);
      console.log(message);
    }
  };

  const handleErrorMessage = (message: string) => {
    setErrorMessage((prev) => {
      const newArr = new Set([...prev, message]);
      return Array.from(newArr);
    });
  };

  const checkPassword = () => {
    setErrorMessage((prev) => {
      return prev.filter((msg) => msg !== userNotFoundMsg);
    });

    const { password, re_password } = user;

    if (password !== re_password) {
      setLoading(false);
      handleErrorMessage(notMatchMsg);
      return false;
    } else {
      setErrorMessage((prev) => {
        return prev.filter((msg) => msg !== notMatchMsg);
      });
    }
    const check = /^(?=.*[0-9]).{8,}$/.test(user.password);
    if (!check) {
      setLoading(false);
      handleErrorMessage(atLeastLetterMsg);
      handleErrorMessage(containedNumberMsg);
      return false;
    } else {
      setErrorMessage((prev) => {
        return prev.filter(
          (msg) => msg !== atLeastLetterMsg && msg !== containedNumberMsg
        );
      });
    }
    return true;
  };

  return (
    <Box>
      <HeaderMenu logged={false} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 4,
          pb: 4,
          backgroundColor: secondary,
          minHeight: "500px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            backgroundColor: white,
            borderRadius: "10px",
            overflow: "hidden",
            pb: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: success,
              width: "100%",
              p: 2,
              textAlign: "center",
              fontWeight: 800,
              color: white,
              fontSize: "1.2rem",
            }}
          >
            FORGOT PASSWORD
          </Box>
          <TextFormRow
            checkEmpty={checkEmpty}
            label="Email"
            placeholder="Enter your Email"
            name="email"
            value={user.email}
            onChange={handleChangeInput}
          />
          <PasswordFormRow
            label="New Password"
            placeholder="Enter your password"
            checkEmpty={checkEmpty}
            name="password"
            onChange={handleChangeInput}
          />
          <PasswordFormRow
            label="Confirm password"
            placeholder="Re-Enter your password"
            checkEmpty={checkEmpty}
            name="re_password"
            onChange={handleChangeInput}
          />
          <Box sx={{ color: success, fontSize: "13px", mt: 1, fontWeight: 800, p: 1.5 }}>
            {errorMessage.map((msg) => {
              return <p key={msg}>- {msg}</p>;
            })}
          </Box>
          <Button
            color="secondary"
            sx={{ mt: 2 }}
            loading={loading}
            type="submit"
            onClick={handleSubmit}
          >
            Create new Password
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
