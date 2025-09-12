
export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const storage = localStorage?.getItem("app:user");
    if (storage) {
      return JSON.parse(storage);
    } else return null;
  } else return null;
};

export const deleteUserInfo = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem("app:user");
  }
};
