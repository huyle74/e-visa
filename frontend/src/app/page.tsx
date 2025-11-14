"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const matches = useMediaQuery("(max-width:600px)");
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
      <HeaderMenu logged={user !== null} userName={user?.lastName || ""} />
      <Box>
        <Box sx={{ position: "relative" }}>
          <img
            className={styles.backgroundImage}
            src={backgroundImage}
            alt="backdrop"
          />
          <div className={styles.backgroundBlur}>
            <Image
              src={logoWhite}
              alt="logo"
              width={matches ? 150 : 600}
              height={matches ? 50 : 200}
            />
            <h1 className={styles.backgroundTitle}>
              MY E-VISA <br />
              <span style={{ margin: `${matches ? "0,1rem" : "1rem"}` }}>
                OFFICIAL WEBSITE
              </span>
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
              ml: matches ? 0 : 3,
              fontSize: matches ? "1rem" : "auto",
            }}
          >
            HOW TO APPLY ONLINE
          </Box>
          <Box
            sx={{
              width: "10vw",
              height: "4px",
              backgroundColor: white,
              ml: matches ? 0 : 3,
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: matches ? "90vw" : "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: "auto",
            pb: matches ? 2 : 10,
            overflow: "hidden",
            height: "100%",
            flexDirection: matches ? "column" : "row",
          }}
        >
          {steps.map((content, i) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: matches ? "90%" : `${i !== 5 ? "16.66%" : 0}`,
              }}
              key={i}
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
