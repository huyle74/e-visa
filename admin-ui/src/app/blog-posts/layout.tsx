import React from "react";
import { ThemedLayout } from "@refinedev/mui";
import { Header } from "@components/header";
import { AuthProvider } from "@contexts/auth";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <ThemedLayout Header={Header}>{children}</ThemedLayout>;
    </AuthProvider>
  );
}
