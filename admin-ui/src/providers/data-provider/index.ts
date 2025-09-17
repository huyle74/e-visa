"use client";

import axios from "axios";
import { DataProvider } from "@refinedev/core";
import { getUserInfo } from "@app/libs/localStorage";

const API_URL = process.env.NEXT_PUBLIC_PREFIX_BACKEND_URL || "";
const admin = getUserInfo();

const dataProvider = (): DataProvider => ({
  getList: async () => {
    const endpoint = API_URL + "/admin-verified/list-customers";
    const { data } = await axios.post(
      endpoint,
      {},
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      }
    );

    return { data: data.data, total: data.data.length };
  },
  getOne: async () => {
    throw new Error("Not implemented");
  },

  create: async () => {
    throw new Error("Not implemented");
  },
  update: async () => {
    throw new Error("Not implemented");
  },
  deleteOne: async () => {
    throw new Error("Not implemented");
  },

  getApiUrl: () => API_URL,
});

export default dataProvider;
