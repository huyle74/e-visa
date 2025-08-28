import { Box, Button } from "@mui/material";

interface ButtonMenuProps {
  disabledSignIn?: boolean;
  disabledCreateAccount?: boolean;
  loggedIn?: boolean;
}

const ButtonMenuHomePage = ({
  loggedIn = false,
  disabledSignIn = false,
  disabledCreateAccount = false,
}: ButtonMenuProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        justifyContent: "space-between",
        pr: 2,
        fontWeight: 900,
      }}
    >
      {loggedIn && (
        <Button
          variant="contained"
          href="/dashboard"
          color="secondary"
          sx={{ fontWeight: 1000, mr: 1 }}
        >
          DASHBOARD
        </Button>
      )}

      <Button
        disabled={disabledSignIn}
        variant="outlined"
        href="/login"
        sx={{ fontWeight: 1000, mr: 1 }}
      >
        SIGN IN
      </Button>
      <Button
        variant="contained"
        href="/signup"
        disabled={disabledCreateAccount}
        sx={{ fontWeight: 1000, mr: 1 }}
      >
        CREATE ACCOUNT
      </Button>
    </Box>
  );
};

export default ButtonMenuHomePage;
