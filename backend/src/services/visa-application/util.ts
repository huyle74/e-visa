import userRepos from "@/repositories/user.repository";

export const checkUser = async (email: string, id: string) => {
  const userById = await userRepos.findOne(id);
  if (!userById) throw new Error("User doesnt exist");

  if (userById.email === email) {
    return true;
  } else {
    return false;
  }
};

export const mapEnum = (objectEnum: {}, key: string) => {
  let result: string = "";

  Object.entries(objectEnum).map((item) => {
    if (key === item[1]) return (result = item[0]);
  });

  return result;
};
