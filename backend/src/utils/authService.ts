import bcrypt from "bcryptjs";

/**
 * helper function
 * @param password
 * @param hashedPassword
 * @returns
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
