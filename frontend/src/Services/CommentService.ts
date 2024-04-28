import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = "https://localhost:64553/api";

const authenticatedAxios = (token: string) => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header
    },
  });
};

export const commentPostAPI = async (
  title: string,
  content: string,
  stockSymbol: string,
) => {
  try {
    return await authenticatedAxios(
      localStorage.getItem("token")!,
    ).post<CommentPost>(`${api}/comment/${stockSymbol}`, {
      title: title,
      content: content,
    });
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (stockSymbol: string) => {
  try {
    return await authenticatedAxios(localStorage.getItem("token")!).get<
      CommentGet[]
    >(`${api}/comment?Symbol=${stockSymbol}`);
  } catch (error) {
    handleError(error);
  }
};
