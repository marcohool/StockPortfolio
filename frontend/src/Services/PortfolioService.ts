import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";

const api = "https://localhost:64553/api";

const authenticatedAxios = (token: string) => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header
    },
  });
};

export const portfolioAddAPI = async (stockSymbol: string) => {
  try {
    return await authenticatedAxios(
      localStorage.getItem("token")!,
    ).post<PortfolioPost>(`${api}/portfolio?symbol=${stockSymbol}`);
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (stockSymbol: string) => {
  try {
    return await authenticatedAxios(
      localStorage.getItem("token")!,
    ).delete<PortfolioPost>(`${api}/portfolio?symbol=${stockSymbol}`);
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    return await authenticatedAxios(localStorage.getItem("token")!).get<
      PortfolioGet[]
    >(`${api}/portfolio`);
  } catch (error) {
    handleError(error);
  }
};
