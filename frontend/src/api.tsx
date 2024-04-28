import axios from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
} from "./company";

export interface SearchResponse {
  data: CompanySearch[];
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

const apiClient = axios.create({
  baseURL: "https://financialmodelingprep.com/api/v3",
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchCompanies = async (query: string) => {
  try {
    return await apiClient.get<SearchResponse>(
      `search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An expected error has occurred.";
    }
  }
};

export const getCompanyProfile = async (
  query: string,
): Promise<ApiResponse<CompanyProfile[]>> => {
  try {
    return await apiClient.get<CompanyProfile[]>(
      `profile/${query}?apikey=${process.env.REACT_APP_FMP_API_KEY}`,
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
    return await apiClient.get<CompanyKeyMetrics[]>(
      `key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_FMP_API_KEY}`,
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
    return await apiClient.get<CompanyIncomeStatement[]>(
      `income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
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

export const getBalanceSheet = async (
  query: string,
): Promise<ApiResponse<CompanyBalanceSheet[]>> => {
  try {
    return await apiClient.get<CompanyBalanceSheet[]>(
      `balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
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

export const getCashFlowStatement = async (
  query: string,
): Promise<ApiResponse<CompanyCashFlow[]>> => {
  try {
    return await apiClient.get<CompanyCashFlow[]>(
      `cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
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

export const getTenK = async (
  query: string,
): Promise<ApiResponse<CompanyTenK[]>> => {
  try {
    return await apiClient.get<CompanyTenK[]>(
      `sec_filings/${query}?type=10-k&page=0&apikey=${process.env.REACT_APP_FMP_API_KEY}`,
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
