"use client";

import axios from "axios";
import { DataProvider } from "@refinedev/core";
import { getUserInfo } from "@app/libs/localStorage";
import { supportingDocumentField } from "@app/dto/application.dto";

const admin = getUserInfo();

const prefix = process.env.NEXT_PUBLIC_PREFIX_BACKEND_URL + "/admin-verified/";

const dataProvider = (): DataProvider => ({
  getList: async ({ resource }) => {
    const endpoint = prefix + resource + "/list";
    const { data } = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${admin.accessToken}` },
    });

    return { data: data.data, total: data.data.length };
  },
  getOne: async ({ id, resource }) => {
    const endpoint = prefix + resource + "/" + id;

    const { data } = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${admin.accessToken}` },
    });

    let supportingDocument: Blob[] | null = [];
    if (resource === "application") {
      for (const field of supportingDocumentField) {
        const endpoint = prefix + resource + "/supporting-document";
        const data = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${admin.accessToken}` },
          params: {
            applicationId: id,
            field,
          },
          responseType: "blob",
        });
        const convert = data
        console.log(convert);
        if (!data) break;

        const result = { [`${field}`]: data.data };
        supportingDocument.push(result);
      }
    }

    return { data: { ...data.data, supportingDocument } };
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

  getApiUrl: () => prefix,
});

export default dataProvider;
