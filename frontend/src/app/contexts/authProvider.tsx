import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserInfo } from "../libs/getLocalStorage";
import { backend_url } from "../server-side/envLoader";
import { deleteUserInfo } from "../libs/getLocalStorage";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  accessToken: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  lastUpdatedAt: Date;
};
interface AuthContextValue {
  user: User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const result = getUserInfo();
    if (!result) {
      router.push("/login");
      return;
    }
    setUser(result);

    (async () => {
      const endpoint = backend_url + "api" + "/guard";
      try {
        const accessToken = result?.accessToken;
        await axios.post(endpoint, { accessToken });
      } catch (error: any) {
        deleteUserInfo();
        router.push("/login");
      }
    })();
  }, []);

  const logout = () => deleteUserInfo();

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
