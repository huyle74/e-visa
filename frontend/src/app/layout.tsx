import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import StyledComponentsRegistry from "./libs/register";
import { connection } from "next/server";

import theme from "./server-side/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global E-Visa",
  description: "Apply for get Visa",
};

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();

  return (
    <html lang="en" className={roboto.className}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <body>{children}</body>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
