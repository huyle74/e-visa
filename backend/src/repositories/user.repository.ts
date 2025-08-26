import prisma from "@/prisma/prisma";
import { Prisma, User } from "@prisma/client";

const findOne = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw new Error("Cannot find user by id");
  }
};

const findByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Cannot find user by email");
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

const userRepos = { findOne, create, update, findByEmail };

export default userRepos;
