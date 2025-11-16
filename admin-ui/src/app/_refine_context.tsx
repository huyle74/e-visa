"use client";

import React from "react";
import { Refine, type AuthProvider } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HailIcon from "@mui/icons-material/Hail";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import routerProvider from "@refinedev/nextjs-router";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import dataProvider from "@providers/data-provider";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { deleteUserInfo, getUserInfo } from "./libs/localStorage";
import { KEY } from "./libs/localStorage";

const backendUrl = process.env.NEXT_PUBLIC_PREFIX_BACKEND_URL;

type RefineContextProps = {
  defaultMode?: string;
};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <>
      <App {...props} />
    </>
  );
};

type AppProps = {
  defaultMode?: string;
};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
      const endpoint = backendUrl + "/admin/login";

      try {
        const { data } = await axios.post(endpoint, { email, password });

        if (data.success === "OK") {
          localStorage.setItem(KEY, JSON.stringify({ ...data.data }));
        }

        return {
          success: true,
          redirectTo: "/customers",
          successNotification: {
            message: "Login Successfully!",
            description: "You have successfully logged in.",
          },
        };
      } catch (error: any) {
        const err = {
          success: false,
          error: {
            name: "Login Failed",
            message: error.response.data.message,
          },
        };
        return err;
      }
    },
    logout: async () => {
      deleteUserInfo();

      return {
        redirectTo: "/login",
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
          error: new Error(error),
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      const admin = getUserInfo();
      const endpoint = backendUrl + "/guard";
      try {
        await axios.post(endpoint, {
          accessToken: admin.accessToken,
        });

        return {
          authenticated: true,
        };
      } catch (error) {
        const failed = { authenticated: false, redirectTo: "/login" };

        return failed;
      }
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      const user = getUserInfo();
      if (user) {
        return user;
      }

      return null;
    },
    forgotPassword: async ({ email, password, re_password }) => {
      const endpoint = backendUrl + "/admin/create-new-password";
      try {
        const { data } = await axios.post(endpoint, {
          email,
          password,
          re_password,
        });
        if (data.success !== "OK") {
          return {
            success: false,
            // redirectTo: "/forgot-password",
            error: {
              name: "Register Error",
              message: "Create new Password Failed",
            },
          };
        }
        return {
          success: true,
          // redirectTo: "/",
          successNotification: {
            message: "Create new Password Successfully!",
            description: "You have created successfully.",
          },
        };
      } catch (error: any) {
        const err = {
          success: false,
          error: {
            name: "Create new Password Failed",
            message: error.response.data.message,
          },
        };
        return err;
      }
    },
  };
  const role = getUserInfo()?.role;
  const defaultMode = props?.defaultMode;

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={defaultMode}>
          <RefineSnackbarProvider>
            <Refine
              accessControlProvider={{
                can: async ({ resource, action, params }) => {
                  if (role === "SUPER_ADMIN") {
                    return {
                      can: true,
                    };
                  }
                  if (role === "ADMIN") {
                    if (resource === "employee") {
                      return { can: false, reason: "Unauthorized" };
                    }
                  }
                  return { can: true };
                },
              }}
              routerProvider={routerProvider}
              dataProvider={dataProvider()}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "customer",
                  list: "/customers",
                  show: "/customers/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <EmojiPeopleIcon />,
                  },
                },
                {
                  name: "application",
                  show: "/application/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <AssignmentIcon />,
                  },
                },
                {
                  name: "employee",
                  list: "/employees",
                  show: "/employees/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <HailIcon />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                title: {
                  text: "My E-Visa - Admin",
                  icon: (
                    <AirlineSeatReclineExtraIcon
                      color="secondary"
                      sx={{ fontSize: "2rem" }}
                    />
                  ),
                },
              }}
            >
              {props.children}
              <RefineKbar />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};
