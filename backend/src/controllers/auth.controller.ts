import { CookieOptions, Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";
import isValidEmail from "../utils/isValidEmail.js";
import generateToken from "../utils/generateToken.js";
import internalServerError from "../utils/internalServerError.js";

// method simply for testing connection
export const pingPong = (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
  return;
};

// what the backend api is expecting to be included in the request body
interface SignupRequestBody {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const signup = async (
  req: Request<{}, {}, Partial<SignupRequestBody>>,
  res: Response
): Promise<void> => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // ensure all fields were sent
    if (!email || !username || !password || !confirmPassword) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    // ensure passwords match
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    // validate email format
    if (!isValidEmail(email)) {
      res.status(400).json({ message: `Email ${email} is not of valid format` });
      return;
    }

    // ensure the email does not exist already
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      res.status(400).json({ message: `Account with the email ${email} already exists` });
      return;
    }

    // ensure the username does not exist already
    const usernameExists = await prisma.user.findUnique({ where: { username } });
    if (usernameExists) {
      res.status(400).json({ message: `Account with the username ${username} already exists` });
      return;
    }

    // hashing the password to store in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // check if creation successful
    if (newUser) {
      // generate jwt token
      generateToken(newUser.id, false, res);

      // return user with useful data as a json object with created status
      const filteredUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
        name: newUser.name,
        bio: newUser.bio,
      };
      res.status(201).json({ user: filteredUser });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error: unknown) {
    internalServerError("signup controller", error, res);
  }
};

// what the backend api is expecting to be included in the request body
interface LoginRequestBody {
  email: string;
  password: string;
}

export const login = async (
  req: Request<{}, {}, Partial<LoginRequestBody>>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // ensure all fields were sent
    if (!email || !password) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    // look for a matching user
    const user = await prisma.user.findUnique({ where: { email, isDeleted: false } });

    // no user found
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // make sure password is correct
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Password incorrect" });
      return;
    }

    // after validating user, generate jwt token
    generateToken(user.id, false, res);

    // return user with useful data as a json object
    const filteredUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      name: user.name,
      bio: user.bio,
    };

    res.status(200).json({ user: filteredUser });
  } catch (error: unknown) {
    internalServerError("login controller", error, res);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // set jwt cookie to be empty string with max age of 0
    const options: CookieOptions = {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    };
    res.cookie("jwt", "", options);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    internalServerError("logout controller", error, res);
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const filteredUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      name: user.name,
      bio: user.bio,
    };

    res.status(200).json({ user: filteredUser });
  } catch (error: unknown) {
    internalServerError("getMe controller", error, res);
  }
};
