"use client";

export const KEY = "app:admin";

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const storage = localStorage?.getItem(KEY);
    if (storage) {
      return JSON.parse(storage);
    } else return null;
  } else return null;
};

export const deleteUserInfo = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(KEY);
  }
};
