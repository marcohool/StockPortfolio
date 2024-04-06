import axios from "axios";
import { Upload } from "./upload";

interface SearchResponse {
  data: Upload[];
}

export const getUpload = async (query: string) => {
  try {
    return await axios.get<Upload>(
      `https://localhost:5401/api/Upload/${query}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error message: ", error.response?.data);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An expected error occurred.";
    }
  }
};
