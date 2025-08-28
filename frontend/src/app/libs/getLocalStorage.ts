export const getUserInfo = () => {
  const storage = localStorage?.getItem("app:user") || "";
  return JSON.parse(storage);
};
