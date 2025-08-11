import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { googleCLientId } from "@/app/server-side/envLoader";

export default function GoogleLoginButton() {
  //   const googleLogin = useGoogleLogin({
  //    ? flow: "auth-code",
  //     onSuccess: async (codeResponse) => {
  // ~    console.log(codeResponse);
  //      ^ const tokens = await axios.post("http://localhost:3001/auth/google", {
  //         code: codeResponse.code,
  //       });

  //       console.log(tokens);
  //     },
  //     onError: (errorResponse) => console.log(errorResponse),
  //   });

  return (
    <Box sx={{ display: "flex", mt: 1, mb: 1 }}>
      <Button variant="contained" sx={{ m: "auto", width: "40%" }} startIcon={<GoogleIcon />}>
        Google
      </Button>
    </Box>
  );
}
