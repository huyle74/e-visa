import prisma from '../prisma/prisma';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/auth.dto';

const findOne = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    throw new Error('Cannot find user');
  }
};

const create = async (data: CreateUserDto): Promise<User | null> => {
  try {
    const { nation, nationIso2, ...userData } = data;
    const newUser = await prisma.user.create({
      data: { ...userData, nation: { connect: { iso2: nation } } },
    });

    return newUser;
  } catch (error) {
    throw new Error('Cannot create User');
  }
};

const userRepos = { findOne, create };

export default userRepos;
