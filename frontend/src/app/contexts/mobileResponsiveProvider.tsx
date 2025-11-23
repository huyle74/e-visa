"use client";

import { ReactNode, createContext, useContext } from "react";

interface MobileResponsiveProps {
  children: ReactNode;
  matches: boolean;
}

type MobileMatches = { matches: boolean };

const MobileContext = createContext<MobileMatches | null>(null);

export const MobileMatchesProvider = ({
  children,
  matches,
}: MobileResponsiveProps) => {
  return (
    <MobileContext.Provider value={{ matches }}>
      {children}
    </MobileContext.Provider>
  );
};

export function useMobileMedia(): MobileMatches {
  const ctx = useContext(MobileContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
