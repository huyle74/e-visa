"use client";

import { useState, FormEventHandler, MouseEvent, ReactNode } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemedTitle } from "@refinedev/mui";
import { useLogin, useForgotPassword } from "@refinedev/core";

export default function Login() {
  const { mutate: login } = useLogin();
  const { mutate: forgotPassword } = useForgotPassword();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showReNewPassword, setReNewShowPassword] = useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [newRePasswordError, setReFNewPasswordError] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCreateNewPassword: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("newPassword") as string;
    const re_password = formData.get("re_password") as string;

    const checkEmail = email.length === 0;
    const checkPassword = password.length === 0;
    const checkRePassword = re_password.length === 0;

    checkEmail ? setEmailError(true) : setEmailError(false);
    checkPassword ? setNewPasswordError(true) : setNewPasswordError(false);
    checkRePassword
      ? setReFNewPasswordError(true)
      : setReFNewPasswordError(false);

    if (checkEmail || checkPassword || checkRePassword) return;

    forgotPassword(
      { email, password, re_password },
      {
        onSuccess: (data) => {
          if (data.success) return setChangePassword(false);
        },
      }
    );
  };

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
      {changePassword ? (
        <form onSubmit={handleCreateNewPassword}>
          <FormContainer>
            <TextField
              color="secondary"
              fullWidth
              sx={{ mb: 3 }}
              placeholder="Enter your admin email"
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
                New Password
              </InputLabel>
              <OutlinedInput
                name="newPassword"
                error={newPasswordError}
                placeholder="Enter your password"
                id="outlined-adornment-password"
                type={showNewPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showNewPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              <FormControl sx={{ mt: 1 }} color="secondary">
                <InputLabel htmlFor="outlined-adornment-password">
                  Re-enter Password
                </InputLabel>
                <OutlinedInput
                  name="re_password"
                  error={newRePasswordError}
                  placeholder="Re-enter your new password"
                  id="outlined-adornment-password"
                  type={showReNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showReNewPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={() => setReNewShowPassword((prev) => !prev)}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showReNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Re-enter Password"
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
                  {changePassword ? "CREATE NEW PASSWORD" : " SIGN IN"}
                </Button>
              </Box>
            </FormControl>
          </FormContainer>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <FormContainer>
            <TextField
              color="secondary"
              fullWidth
              sx={{ mb: 3 }}
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
              <Box sx={{ width: "100%", mt: 2 }}>
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {changePassword ? "CREATE NEW PASSWORD" : " SIGN IN"}
                </Button>
              </Box>
            </FormControl>
          </FormContainer>
        </form>
      )}
      <Button
        size="small"
        onClick={() => {
          setChangePassword((prev) => !prev);
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            fontSize: "0.7rem",
            padding: "0.5rem 2rem 0.5rem 2rem",
            color: "white",
            borderRadius: "1rem",
            fontWeight: 500,
          }}
        >
          {changePassword ? "Sign in" : "Forgot password"}
        </Box>
      </Button>
    </Box>
  );
}

const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

const FormContainer = ({ children }: { children: ReactNode }) => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "rgb(225,225,225,0.2)",
        backdropFilter: "blur(10px)",
        p: 6,
        borderRadius: "15px",
      }}
    >
      {children}
    </Box>
  );
};
