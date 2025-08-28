import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import style from "./footer.module.css";
import { logoWhite } from "@/app/libs/image-config";
import { white, primary , secondary} from "@/app/libs/color-config";

const arrayText = Array.from("My");
const visaText = Array.from("E-visa");

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#21130d",
        color: white,
        padding: "5rem 0 7rem 0",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          height: "50%",
          alignItems: "center",
        }}
      >
        {arrayText.map((letter, i) => (
          <Box className="lienlucbaoFooter" key={i}>
            {letter}
          </Box>
        ))}
        <Box sx={{ display: "flex", ml: 2 }}>
          {visaText.map((letter, i) => (
            <Box key={i} className="visa-letter" sx={{ color: secondary }}>
              {letter}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image alt="logo" src={logoWhite} width={450} height={150} />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mt: 2 }}>
          <Box className={style.info}>VIETNAM</Box>
          <Box className={style.info}>(+84) 707 002 003</Box>
          <Box className={style.info}>lienlucbao@gmail.com</Box>
          <Box className={style.info}>
            Light House Building, 95 Dien Bien Phu Street, Da Kao Ward, District 1, Ho Chi
            Minh City 700000.
          </Box>
        </Box>
      </Box>
      <Box className={style.iconsContainer}>
        <IconButton href="https://www.facebook.com/visadau.daucokho/" target="_blank">
          <FacebookIcon color="primary" />
        </IconButton>
        <IconButton>
          <EmailIcon color="primary" />
        </IconButton>
        <IconButton href="https://x.com/LucVisa">
          <XIcon color="primary" />
        </IconButton>
        <IconButton href="https://www.youtube.com/channel/UCYz7A2z5xM2jKstQ2hqjGYA">
          <YouTubeIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}
