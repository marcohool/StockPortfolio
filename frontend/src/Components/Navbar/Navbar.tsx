import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import logo from "./logo.png";
import "./Navbar.css";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  const { isLoggedIn, user, logoutUser } = useAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" className="logo" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div>Welcome, {user?.userName}</div>
            <Link
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              onClick={logoutUser}
              to="/"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login">
              <div className="hover:text-darkBlue">Login</div>
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
