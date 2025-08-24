import prisma from "@/prisma/prisma";
import { Prisma, User } from "@prisma/client";

const findOne = async (where: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where : {id: where}});
    return user;
  } catch (error) {
    throw new Error("Cannot find user");
  }
};

const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  try {
    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot create User");
  }
};

const update = async (where: Prisma.UserWhereUniqueInput, data: any) => {
  try {
    const updateUser = await prisma.user.update({ where, data });
    return updateUser;
  } catch (error: any) {
    console.log(error.message);

    throw new Error("Failed to update Database");
  }
};

const userRepos = { findOne, create, update };

export default userRepos;
