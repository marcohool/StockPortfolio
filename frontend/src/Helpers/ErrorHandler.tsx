import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err!.data.errors) {
        toast.warning(err!.data.errors[e]);
      }
    } else if (err?.data) {
      toast.warning(err.data);
    } else if (err?.status === 401) {
      toast.error("Unauthorized");
      window.history.pushState({}, "LoginPage", "/login");
    }

    toast.warning(
      `An error occurred, please try again later. Error: ${err?.data}`,
    );
  }
};
