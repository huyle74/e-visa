export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const storage = localStorage?.getItem("app:user") || "";
    return JSON.parse(storage);
  }
};
