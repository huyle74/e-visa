"use client";

import axios from "axios";
import { DataProvider } from "@refinedev/core";
import { getUserInfo } from "@app/libs/localStorage";
import { supportingDocumentField } from "@app/dto/application.dto";

const admin = getUserInfo();

const prefix = process.env.NEXT_PUBLIC_PREFIX_BACKEND_URL + "/admin-verified/";

const dataProvider = (): DataProvider => ({
  getList: async ({ resource, pagination, sorters }) => {
    const [sortBy]: any = sorters;

    const endpoint = prefix + resource + "/list";
    const params = {
      ...pagination,
      sort: sortBy?.order,
      sortBy: sortBy?.field,
    };
    const { data } = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${admin.accessToken}` },
      params,
    });

    if (resource === "customer") {
      return { data: data.data.results, total: data.data.total };
    }

    return { data: data.data, total: data.data.length };
  },
  getOne: async ({ id, resource }) => {
    const endpoint = prefix + resource + "/" + id;

    const { data } = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${admin.accessToken}` },
    });
    const result = { ...data.data };
    let supportingDocument: Blob[] | null = [];
    try {
      if (resource === "application") {
        for (const field of supportingDocumentField) {
          const endpoint = prefix + resource + "/supporting-document";
          const data = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${admin.accessToken}` },
            params: {
              applicationId: id,
              field,
              responseType: "blob",
            },
          });

          if (!data) break;

          const result: any = { [`${field}`]: data.data };
          supportingDocument.push(result);
        }
        return { data: { ...result, supportingDocument } };
      }
      return { data: { ...result } };
    } catch (error) {
      return { data: { ...result, supportingDocument } };
    }
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
