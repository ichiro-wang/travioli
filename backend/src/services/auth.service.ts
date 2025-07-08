import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import { User } from "../generated/client/index.js";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";

export class AuthService {
  /**
   * creating user for when a user signs up
   */
  async createUser(userData: { email: string; username: string; password: string }): Promise<User> {
    const { email, username, password } = userData;

    // normalizing username to lowercase to ensure uniqueness checks are case insensitive
    const normalizedUsername = username.toLowerCase();
    const normalizedEmail = email.toLowerCase();

    // check for existing users in parallel to reduce response latency => more efficiency
    const [emailExists, usernameExists] = await Promise.all([
      prisma.user.findUnique({ where: { email: normalizedEmail } }),
      prisma.user.findUnique({ where: { username: normalizedUsername } }),
    ]);

    if (emailExists) {
      throw new EmailAlreadyExistsError(email);
    }
    if (usernameExists) {
      throw new UsernameAlreadyExistsError(username);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await prisma.user.create({
      data: { email, username: normalizedUsername, password: hashedPassword },
    });

    return newUser;
  }

  /**
   * logs in a user
   */
  async authenticateUser(authData: { email: string; password: string }): Promise<User> {
    const { email, password } = authData;

    const normalizedEmail = email.toLowerCase();

    let user = await this.findUserByEmail(normalizedEmail);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordCorrect = await this.verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    // if a (soft) deleted user logs back in, then automatically reactivate their account
    if (user.isDeleted) {
      user = await prisma.user.update({ where: { id: user.id }, data: { isDeleted: false } });
    }

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user && !user.isDeleted ? user : null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    return user && !user.isDeleted ? user : null;
  }

  /**
   * don't check isDeleted because we use this to log users in via email.
   * an account marked as deleted will reactivate if they log back in.
   * so if we don't return the deleted user then we can't reactivate their account on log in
   */
  private async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  /**
   * @param inputPassword user-entered password
   * @param hashedPassword hashed password stored in database
   * @returns boolean of whether the passwords match
   */
  async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  /**
   * @param inputPassword user-entered password
   * @returns the hashed password
   */
  private async hashPassword(inputPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(inputPassword, salt);
  }
}
