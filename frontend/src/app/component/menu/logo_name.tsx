import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import logo from "../../../../public/logo.png";

const LogoTitle = () => {
  const titleStyle = {
    fontWeight: 900,
    fontSize: "1.7rem",
  };
  return (
    <Link href={"/"} style={{ display: "flex", alignItems: "center" }}>
      <Image src={logo} alt="logo" width={90} height={90} />
      <Box sx={{ ml: 1, height: "60%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
        <p style={titleStyle}>
          GLOBAL E-VISA <span style={{ color: "#21706b" }}> OFFCIAL WEBSITE</span>
        </p>
        <p style={{ ...titleStyle, fontSize: "1.2rem" }}>A product of Global E-Visa</p>
      </Box>
    </Link>
  );
};
export default LogoTitle;
