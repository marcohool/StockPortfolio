import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import "./react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
