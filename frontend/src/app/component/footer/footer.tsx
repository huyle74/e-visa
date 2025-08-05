import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../../../../public/logo.png";
import style from "./footer.module.css";

const arrayText = ["L", "I", "E", "N", "L", "U", "C", "B", "A", "O"];
const visaText = ["V", "I", "S", "A"];

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#21130d", color: "#FFFADC", padding: "5rem 0 7rem 0", position: "relative" }}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center", height: "50%", alignItems: "center" }}>
        {arrayText.map((letter, i) => (
          <Box className="lienlucbaoFooter" key={i}>
            {letter}
          </Box>
        ))}
        <Box sx={{ display: "flex", color: "#4caf50", ml: 2 }}>
          {visaText.map((letter, i) => (
            <Box key={i} className="visa-letter">
              {letter}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image alt="logo" src={logo} width={120} height={120} />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3, mt: 2 }}>
          <Box className={style.info}>VIETNAM</Box>
          <Box className={style.info}>(+84) 707 002 003</Box>
          <Box className={style.info}>lienlucbao@gmail.com</Box>
          <Box className={style.info}>Light House Building, 95 Dien Bien Phu Street, Da Kao Ward, District 1, Ho Chi Minh City 700000.</Box>
        </Box>
      </Box>
      <Box className={style.iconsContainer}>
        <IconButton href="https://www.facebook.com/visadau.daucokho/" target="_blank">
          <FacebookIcon color="success" />
        </IconButton>
        <IconButton>
          <EmailIcon color="success" />
        </IconButton>
        <IconButton href="https://x.com/LucVisa">
          <XIcon color="success" />
        </IconButton>
        <IconButton href="https://www.youtube.com/channel/UCYz7A2z5xM2jKstQ2hqjGYA">
          <YouTubeIcon color="success" />
        </IconButton>
      </Box>
    </Box>
  );
}
