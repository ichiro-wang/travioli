import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../generated/client/index.js";
import {
  EmailAlreadyExistsError,
  EmailNotVerifiedError,
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";
import { EmailService } from "./email.service.js";
import { RedisService } from "./redis.service.js";

export class AuthService {
  private emailService: EmailService;
  private redisService: RedisService;
  private EMAIL_VERIFICATION_LINK_EXPIRY = 600;

  constructor(emailService: EmailService, redisService: RedisService) {
    this.emailService = emailService;
    this.redisService = redisService;
  }

  /**
   * creating user for when a user signs up
   */
  async createUser(userData: {
    email: string;
    username: string;
    password: string;
  }): Promise<User> {
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
  async authenticateUser(authData: {
    email: string;
    password: string;
  }): Promise<User> {
    const { email, password } = authData;

    const normalizedEmail = email.toLowerCase();

    let user = await this.findUserByEmail(normalizedEmail);

    if (!user) {
      throw new UserNotFoundError();
    }

    /**
     * verifiedAt is null as long as the user has not verified it
     * give the user a message reminding to verify their email
     */
    if (!user.verifiedAt) {
      throw new EmailNotVerifiedError();
    }

    const isPasswordCorrect = await this.verifyPassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    // if a (soft) deleted user logs back in, then automatically reactivate their account
    if (user.isDeleted) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isDeleted: false },
      });
    }

    return user;
  }

  async handleVerificationEmail(recipient: string): Promise<void> {
    const email_verif_token = crypto.randomBytes(32).toString("hex");

    const tokenCacheKey = `await_email_verification:${email_verif_token}`;
    await this.redisService.setEx(
      tokenCacheKey,
      recipient,
      this.EMAIL_VERIFICATION_LINK_EXPIRY
    );

    // swap these when using frontend vs backend
    // frontend:
    // const verificationMessage = `<p>Verify your email <a href=${process.env.REQUEST_ORIGIN}/verify-email?token=${email_verif_token}>here</a>.</p>`;
    // backend:
    const verificationMessage = `
      <p>Verify your email 
        <a href=http://localhost/api/auth/verify-email?token=${email_verif_token}>here</a>.
      </p>`;

    await this.emailService.sendEmail(
      recipient,
      "Email Verification",
      verificationMessage
    );
  }

  /**
   * this function is called when a user clicks the link in their email to verify that the email belongs to them
   */
  async verifyEmail(email: string): Promise<User> {
    try {
      const currentTime = new Date();

      const user = await prisma.user.update({
        where: { email },
        data: { verifiedAt: currentTime },
      });

      return user;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new UserNotFoundError();
      }

      throw new Error();
    }
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
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  /**
   * @param inputPassword user-entered password
   * @param hashedPassword hashed password stored in database
   * @returns boolean of whether the passwords match
   */
  async verifyPassword(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
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
