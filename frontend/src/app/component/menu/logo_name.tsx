import Link from "next/link";
import Image from "next/image";
import { Box, useMediaQuery } from "@mui/material";
import { primary } from "@/app/libs/color-config";

const LogoTitle = () => {
  const matches = useMediaQuery("(max-width:600px)");

  const titleStyle = {
    fontWeight: 900,
    fontSize: "1.7rem",
  };
  return (
    <Link href={"/"} style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={"https://darkred-crane-929274.hostingersite.com/logo.png"}
        alt="logo"
        width={matches ? 100 : 170}
        height={matches ? 40 : 60}
      />
      {!matches && (
        <Box
          sx={{
            ml: 2,
            height: "60%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <p style={titleStyle}>
            MY E-VISA <span style={{ color: primary }}> OFFICIAL WEBSITE</span>
          </p>
          <p style={{ ...titleStyle, fontSize: "1.2rem" }}>
            A product of My E-Visa
          </p>
        </Box>
      )}
    </Link>
  );
};
export default LogoTitle;
