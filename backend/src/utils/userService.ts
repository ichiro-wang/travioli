import prisma from "../db/prisma.js";
import { User } from "../generated/client/index.js";

/**
 * Find a user by id
 * @param id id of the user
 * @returns the User object if a user is found and not deleted, otherwise return null
 */
export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user && !user.isDeleted ? user : null;
  } catch (error: unknown) {
    throw error;
  }
};

/**
 * Find a user by email
 * @param email id of the user
 * @returns the User object if a user is found and not deleted, otherwise return null
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user && !user.isDeleted ? user : null;
  } catch (error: unknown) {
    throw error;
  }
};
