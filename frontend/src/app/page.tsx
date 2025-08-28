"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import HeaderMenu from "./component/menu/header-menu";
import Footer from "./component/footer/footer";
import { logoWhite, backgroundImage } from "./libs/image-config";
import { primary, white } from "./libs/color-config";

export default function Home() {
  const steps = [
    "Create an account",
    "Fill in an application form",
    "Upload supporting documents",
    "Pay visa fee",
    "Wait for the visa \nto be processed",
    "e-Visa confirmation\n document sent by email",
  ];

  return (
    <Box>
      <HeaderMenu />
      <Box>
        <Box sx={{ position: "relative" }}>
          <img className={styles.backgroundImage} src={backgroundImage} alt="backdrop" />
          <div className={styles.backgroundBlur}>
            <Image src={logoWhite} alt="logo" width={600} height={200} />
            <h1 className={styles.backgroundTitle}>
              MY E-VISA <br /> <span style={{ margin: "1rem" }}>OFFCIAL WEBSITE</span>
            </h1>
            <div style={{ height: "2px", width: "50vw", backgroundColor: "white" }}></div>
            <h2 className={styles.backgroundTitleBelow}>A product of My E-Visa</h2>
          </div>
        </Box>
      </Box>
      <Box className={styles.applySection} sx={{ backgroundColor: primary }}>
        <Box sx={{ ml: 4 }}>
          <Box sx={{ mb: 2 }}>HOW TO APPLY ONLINE</Box>
          <div style={{ width: "10vw", height: "4px", backgroundColor: white }}></div>
        </Box>
        <Box
          sx={{
            width: "70vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: "auto",
          }}
        >
          {steps.map((content, i) => (
            <Box sx={{ display: "flex", alignItems: "center" }} key={i}>
              <Box sx={{ position: "relative" }}>
                <div className={styles.circleStep}>{i + 1}</div>
                <h5 className={styles.contentStep}>{content}</h5>
              </Box>
              {i !== 5 && <Box className={styles.lineStep}></Box>}
            </Box>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
