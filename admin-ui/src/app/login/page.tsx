"use client";

import { useState, FormEventHandler, MouseEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemedTitle } from "@refinedev/mui";
import { useLogin } from "@refinedev/core";
import { useOnError } from "@refinedev/core";

export default function Login() {
  const { mutate: login } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { mutate: error } = useOnError();

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const checkEmail = email.length === 0;
    const checkPassword = password.length === 0;
    checkEmail ? setEmailError(true) : setEmailError(false);
    checkPassword ? setPasswordError(true) : setPasswordError(false);

    if (checkEmail || checkPassword) return;

    login({ email, password });
  };

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%",
        flexDirection: "column",
      }}
      gap={10}
    >
      <ThemedTitle
        collapsed={false}
        text="Welcome to Admin page!"
        wrapperStyles={{ fontSize: "2rem", textAlign: "center" }}
      />
      <form onSubmit={handleLogin}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: "rgb(225,225,225,0.2)",
            backdropFilter: "blur(10px)",
            p: 6,
            borderRadius: "15px",
          }}
        >
          <TextField
            color="secondary"
            fullWidth
            sx={{ mb: 5 }}
            placeholder="Enter your email"
            label="Email"
            name="email"
            error={emailError}
            helperText={emailError && "Please enter your Email"}
          />

          <FormControl
            sx={{ m: 1, width: "100%" }}
            variant="outlined"
            color="secondary"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              error={passwordError}
              placeholder="Enter your password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box sx={{ width: "100%", mt: 2 }}>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              fullWidth
              type="submit"
            >
              SIGN IN
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};
