import axios from "axios";
import {
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
} from "./company";

export interface SearchResponse {
  data: CompanySearch[];
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const searchCompanies = async (query: string) => {
  try {
    return await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An expected error has occured.";
    }
  }
};

export const getCompanyProfile = async (
  query: string,
): Promise<ApiResponse<CompanyProfile[]>> => {
  try {
    return await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_FMP_API_KEY}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return { data: [], error: error.message };
    } else {
      console.log("unexpected error: ", error);
      return { data: [], error: "An unexpected error has occurred." };
    }
  }
};

export const getKeyMetrics = async (
  query: string,
): Promise<ApiResponse<CompanyKeyMetrics[]>> => {
  try {
    return await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_FMP_API_KEY}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return { data: [], error: error.message };
    } else {
      console.log("unexpected error: ", error);
      return { data: [], error: "An unexpected error has occurred." };
    }
  }
};

export const getIncomeStatement = async (
  query: string,
): Promise<ApiResponse<CompanyIncomeStatement[]>> => {
  try {
    return await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return { data: [], error: error.message };
    } else {
      console.log("unexpected error: ", error);
      return { data: [], error: "An unexpected error has occurred." };
    }
  }
};
