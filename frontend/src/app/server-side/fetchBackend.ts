"use server";

import "./envConfig.ts";

export const BACKEND_URL = async () => {
  const url = process.env.PREFIX_BACKEND_URL;
  console.log(url);
  return url;
};
