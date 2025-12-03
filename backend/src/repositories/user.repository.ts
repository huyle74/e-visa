import prisma from "@/prisma/prisma";
import { User } from "@/generate/prisma";

const findOne = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw new Error("Cannot find user by id");
  }
};

const findByEmail = async (email: User["email"]) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        firstName: true,
        lastName: true,
        email: true,
        verifyToken: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Cannot find user by email");
  }
};

const create = async (data: any): Promise<User> => {
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

const update = async (where: any, data: any) => {
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
