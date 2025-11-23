import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import StyledComponentsRegistry from "./libs/register";
import { connection } from "next/server";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import theme from "./contexts/themeContext";
import { CountriesProvider } from "./contexts/countriesProvider";
import { MobileMatchesProvider } from "./contexts/mobileResponsiveProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global E-Visa",
  description: "Apply for get Visa",
};

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await connection();
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const device = new UAParser(userAgent).getDevice().type || "desktop";

  return (
    <html lang="en" className={roboto.className}>
      <ThemeProvider theme={theme}>
        <CountriesProvider>
          <MobileMatchesProvider matches={device === "mobile"}>
            <StyledComponentsRegistry>
              <body>{children}</body>
            </StyledComponentsRegistry>
          </MobileMatchesProvider>
        </CountriesProvider>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
