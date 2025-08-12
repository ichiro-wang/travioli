import axios from "axios";

const BASE_URL = "/api/auth";

export interface SignupArgs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const signup = async (signupArgs: SignupArgs): Promise<Message> => {
  const res = await axios.post(`${BASE_URL}/signup`, signupArgs);

  return res.data;
};

export interface LoginArgs {
  email: string;
  password: string;
}

export const login = async (loginArgs: LoginArgs): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/login`, loginArgs);

  return res.data;
};

export const verifyEmail = async (token: string): Promise<Message> => {
  const res = await axios.get(`${BASE_URL}/verify-email?token=${token}`);

  return res.data;
};

export const resendVerificationEmail = async (
  email: string
): Promise<Message> => {
  const res = await axios.post(`${BASE_URL}/resend-verification-email`, {
    email,
  });

  return res.data;
};

export const logout = async (): Promise<Message> => {
  const res = await axios.post(`${BASE_URL}/logout`);

  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await axios.get(`${BASE_URL}/me`);

  return res.data;
};

export const refreshToken = async (): Promise<Message> => {
  const res = await axios.post(`${BASE_URL}/refresh`);

  return res.data;
};
