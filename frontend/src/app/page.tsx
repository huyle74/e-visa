"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { backend_url } from "./server-side/envLoader";
import HeaderMenu from "./component/menu/header-menu";
import Footer from "./component/footer/footer";
import { logoWhite, backgroundImage } from "./libs/image-config";
import { primary } from "./libs/color-config";
import { getUserInfo } from "./libs/getLocalStorage";
import { useMobileMedia } from "./contexts/mobileResponsiveProvider";

const KEY = "app:user";

export default function Home() {
  const { matches } = useMobileMedia();
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<
    {
      id: number | string;
      title: string;
      message: string;
      createAt: Date;
      status: "READ" | "UNREAD";
    }[]
  >([]);
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
      const userInfo = getUserInfo();
      if (userInfo) setUser(userInfo);
    }
  }, []);
  const steps = [
    "Create an account",
    "Fill in an application form",
    "Upload supporting documents",
    "Pay visa fee",
    `Wait for the visa ${matches ? "" : "\n"} to be processed`,
    `E-Visa confirmation${matches ? "" : "\n"} document sent by email`,
  ];

  return (
    <Box>
      <HeaderMenu
        logged={user !== null}
        userName={user?.lastName || ""}
        notifications={notifications}
      />
      <Box>
        <Box sx={{ position: "relative" }}>
          <img
            className={styles.backgroundImage}
            src={backgroundImage}
            alt="backdrop"
          />
          <div className={styles.backgroundBlur}>
            <img className={styles.logoImage} src={logoWhite} alt="logo" />
            <h1 className={styles.backgroundTitle}>
              MY E-VISA <br />
              <span className={styles.backgroundSpan}>OFFICIAL WEBSITE</span>
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
          <Box
            sx={{
              mb: 2,
              mt: 3,
            }}
            className={styles.howToApply}
          >
            HOW TO APPLY ONLINE
          </Box>
          <Box className={styles.underline}></Box>
        </Box>
        <Box className={styles.stepContainer}>
          {steps.map((content, i) => (
            <Box
              sx={{
                width: matches ? "90%" : `${i !== 5 ? "16.66%" : 0}`,
              }}
              key={i}
              className={styles.stepper}
            >
              <Box
                sx={{
                  position: "relative",
                  mt: matches ? 2 : 0,
                  display: "flex",
                  alignItems: matches ? "center" : "auto",
                  height: "100%",
                }}
              >
                <div className={styles.circleStep}>{i + 1}</div>
                {matches && <Box className={styles.lineStep}></Box>}
                <h5 className={styles.contentStep}>{content}</h5>
              </Box>
              {!matches && i !== 5 && <Box className={styles.lineStep}></Box>}
            </Box>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
