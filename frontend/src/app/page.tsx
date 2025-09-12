"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { backend_url } from "./server-side/envLoader";
import HeaderMenu from "./component/menu/header-menu";
import Footer from "./component/footer/footer";
import { logoWhite, backgroundImage } from "./libs/image-config";
import { primary, white } from "./libs/color-config";
import { getUserInfo } from "./libs/getLocalStorage";

const KEY = "app:user";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const param = useSearchParams();

  useEffect(() => {
    const userId = param.get("user");
    if (userId) {
      (async () => {
        const endpoint = backend_url + "api" + "/login-google/login-callback";
        const { data } = await axios.post(
          endpoint,
          {},
          {
            params: { userId },
            withCredentials: true,
          }
        );
        const user = data.data;
        localStorage.setItem(
          KEY,
          JSON.stringify({ ...user, lastUpdatedAt: Date.now() })
        );
        setUser(user);
      })();
    } else {
      const userInfor = getUserInfo();
      if (userInfor) setUser(userInfor);
    }
  }, []);

  return (
    <Box>
      <HeaderMenu logged={user !== null} userName={user?.lastName || ""} />
      <Box>
        <Box sx={{ position: "relative" }}>
          <img
            className={styles.backgroundImage}
            src={backgroundImage}
            alt="backdrop"
          />
          <div className={styles.backgroundBlur}>
            <Image src={logoWhite} alt="logo" width={600} height={200} />
            <h1 className={styles.backgroundTitle}>
              MY E-VISA <br />{" "}
              <span style={{ margin: "1rem" }}>OFFCIAL WEBSITE</span>
            </h1>
            <div
              style={{ height: "2px", width: "50vw", backgroundColor: "white" }}
            ></div>
            <h2 className={styles.backgroundTitleBelow}>
              A product of My E-Visa
            </h2>
          </div>
        </Box>
      </Box>
      <Box className={styles.applySection} sx={{ backgroundColor: primary }}>
        <Box sx={{ ml: 4 }}>
          <Box sx={{ mb: 2, mt: 3, ml: 3 }}>HOW TO APPLY ONLINE</Box>
          <Box
            sx={{
              width: "10vw",
              height: "4px",
              backgroundColor: white,
              ml: 3,
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: "auto",
            pb: 10,
            overflow: "hidden",
            height: "100%",
          }}
        >
          {steps.map((content, i) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: `${i !== 5 ? "16.66%" : 0}`,
              }}
              key={i}
            >
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

const steps = [
  "Create an account",
  "Fill in an application form",
  "Upload supporting documents",
  "Pay visa fee",
  "Wait for the visa \nto be processed",
  "e-Visa confirmation\n document sent by email",
];
