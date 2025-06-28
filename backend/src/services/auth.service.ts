import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import { User } from "../generated/client/index.js";

export class AuthService {
  async createUser(userData: { email: string; username: string; password: string }): Promise<User> {
    const { email, username, password } = userData;
    const normalizedUsername = username.toLowerCase();

    // parallel check for if email and username are unique
    const [emailExists, usernameExists] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { username: normalizedUsername } }),
    ]);

    if (emailExists) {
      throw new Error(`Account with the email ${email} already exists`);
    }
    if (usernameExists) {
      throw new Error(`Account with the username @${username} already exists`);
    }

    // hashing the password to store in database
    const hashedPassword = await this.hashPassword(password);

    // creating new user with hashed password
    const newUser = await prisma.user.create({
      data: { email, username: normalizedUsername, password: hashedPassword },
    });

    return newUser;
  }

  async authenticateUser(userData: { email: string; password: string }): Promise<User> {
    const { email, password } = userData;

    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await this.verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
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

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user && !user.isDeleted ? user : null;
  }

  async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  private async hashPassword(inputPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(inputPassword, salt);
  }
}
