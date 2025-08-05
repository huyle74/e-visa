import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import logo from "../../../../public/logo.png";

interface HeaderMenuProps {
  loginDisable?: boolean;
  createAccDisable?: boolean;
}

export default function HeaderMenu({ loginDisable = false, createAccDisable = false }: HeaderMenuProps) {
  const titleStyle = {
    fontWeight: 900,
    fontSize: "1.7rem",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "13vh", backgroundColor: "#FFFADC" }}>
      <Image src={logo} alt="logo" width={70} height={70} />
      <Box sx={{ ml: 1, height: "60%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
        <p style={titleStyle}>
          LIEN LUC BAO E-VISA <span style={{ color: "#8bc34a" }}> OFFCIAL WEBSITE</span>
        </p>
        <p style={{ ...titleStyle, fontSize: "1.2rem" }}>A product of Lien Luc Bao Visa</p>
      </Box>
      <Box sx={{ ml: "auto", mr: 2, display: "flex" }}>
        <Box sx={{ mr: 1 }}>
          <Button disabled={loginDisable} href="/login" startIcon={<PersonIcon />} variant="outlined" size="large" sx={{ fontWeight: 900 }}>
            SIGN IN
          </Button>
        </Box>
        <Button disabled={createAccDisable} href="/signup" variant="contained" size="large" sx={{ fontWeight: 900 }}>
          Create an Account
        </Button>
      </Box>
    </Box>
  );
}
