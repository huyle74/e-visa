import { Box, TextField, Button, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { white, secondary } from "@/app/libs/color-config";
import { ReactNode } from "react";

interface actionForm {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  errorMessage: string;
}

export default function SigninForm({ submit, loading, errorMessage }: actionForm) {
  const textFieldStyles = {
    mt: 2,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 4,
        pb: 4,
        backgroundColor: secondary,
      }}
    >
      <Box
        sx={{
          width: "35%",
          border: "2px #F7444E solid",
          m: "auto",
          backgroundColor: white,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: 600,
            backgroundColor: "#F7444E",
            padding: "1rem 0 1rem 0",
            color: "#F7F8F3",
          }}
        >
          MY E-VISA ACCOUNT
        </Box>
        <Box sx={{ margin: "1rem 3rem 1rem 3rem" }}>
          <Box sx={{ fontWeight: 700, mb: 2 }}>Sign In</Box>
          <Box>
            You can sign in using your Global E-Visa account to apply for a visa and track
            your application.
          </Box>
        </Box>
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
            padding: " 1rem 3rem 1rem 3rem ",
          }}
        >
          <Box sx={{ mb: 2, width: "100%" }}>
            <TextField
              required
              label="Email"
              fullWidth
              sx={textFieldStyles}
              name="email"
            />
          </Box>
          <Box sx={{ mb: 2, width: "100%" }}>
            <TextField
              required
              label="Password"
              fullWidth
              sx={textFieldStyles}
              name="password"
              type="password"
            />
          </Box>
          <Box sx={{ color: "red", fontSize: "0.8rem", width: "100%" }}>
            {errorMessage}
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={textFieldStyles}
            type="submit"
            loading={loading}
          >
            SIGIN IN
          </Button>
        </form>
        <Box sx={{ display: "flex" }}>
          <Button sx={{ m: "auto", fontWeight: 900, fontSize: "0.7rem" }}>
            Forgot password?
          </Button>
        </Box>

        <Box sx={{ display: "flex", mt: 1, mb: 1 }}>
          <Button
            variant="contained"
            sx={{ m: "auto", width: "40%" }}
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>
        </Box>

        <Box sx={{ margin: "1rem 3rem 1rem 3rem" }}>
          <Divider>OR</Divider>
        </Box>

        <Box sx={{ margin: "1rem 3rem 2rem 3rem" }}>
          <Button variant="outlined" fullWidth sx={{ fontWeight: 900 }} color="secondary">
            Create Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
