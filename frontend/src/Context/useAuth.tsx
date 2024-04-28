import { UserProfile } from "../Models/User";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (username: string, email: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await registerAPI(username, email, password)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.token);

          const userObj = {
            userName: response.data.userName,
            email: response.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));

          setToken(response?.data.token!);
          setUser(userObj);

          toast.success("User registered successfully");

          navigate("/search");
        }
      })
      .catch((error) => toast.warning("Server error occurred " + error));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.token);

          const userObj = {
            userName: response.data.userName,
            email: response.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));

          setToken(response?.data.token!);
          setUser(userObj);

          toast.success("Login success");

          navigate("/search");
        }
      })
      .catch((error) => toast.warning("Server error occurred " + error));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        registerUser,
        loginUser,
        logoutUser,
        isLoggedIn,
      }}
    >
      {isReady && children}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
