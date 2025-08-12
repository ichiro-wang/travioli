import axios from "axios";

const BASE_URL = "/api/users";

interface CheckUsernameResolve {
  available: boolean;
  message: string;
}

export const checkUsername = async (
  username: string
): Promise<CheckUsernameResolve> => {
  const res = await axios.get(
    `${BASE_URL}/check-username?username=${username}`
  );

  return res.data;
};

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const res = await axios.get(`${BASE_URL}/${userId}`);

  return res.data;
};

export const getUserItineraries = async (userId: string, loadIndex: number) => {
  const res = await axios.get(`${BASE_URL}/${userId}?loadIndex=${loadIndex}`);

  return res.data;
};
