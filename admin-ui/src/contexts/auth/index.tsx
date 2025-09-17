"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { getUserInfo, deleteUserInfo } from "@app/libs/localStorage";
import axios from "axios";
import { redirect } from "next/navigation";

const backend_url = process.env.NEXT_PUBLIC_PREFIX_BACKEND_URL;

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValueType {
  name: string | null;
  accessToken: string | null;
  id: number | string | null;
  email: string | null;
  role: string | null;
}

interface AuthContextProps {
  admin: AuthContextValueType | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [admin, setAdmin] = useState<AuthContextValueType | null>(null);

  useEffect(() => {
    const admin: AuthContextValueType = getUserInfo();
    if (!admin) {
      redirect("/login");
    }
    setAdmin(admin);

    (async () => {
      try {
        const endpoint = backend_url + "/guard";
        await axios.post(endpoint, {
          accessToken: admin?.accessToken,
        });
      } catch (error) {
        deleteUserInfo();
        redirect("/login");
      }
    })();
  }, []);

  const value: AuthContextValueType | null = admin
    ? {
        id: admin?.id || null,
        accessToken: admin?.accessToken || null,
        email: admin?.email || null,
        name: admin?.name || null,
        role: admin?.role || null,
      }
    : null;

  return (
    <AuthContext.Provider value={{ admin: value }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('"useAuth must be used within <AuthProvider>"');

  return ctx;
};
