import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:64553/api";

export const loginAPI = async (username: string, password: string) => {
  try {
    return await axios.post<UserProfileToken>(`${api}/Account/login`, {
      username: username,
      password: password,
    });
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
) => {
  try {
    return await axios.post<UserProfileToken>(`${api}/Account/register`, {
      email: email,
      username: username,
      password: password,
    });
  } catch (error) {
    handleError(error);
  }
};
