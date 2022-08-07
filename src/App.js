import React, { useEffect } from "react";
import "./App.css";
import Welcome from "./screens/Welcome";
import { Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./screens/Home";
import { Toaster } from "react-hot-toast";
import { DBConfig } from "./utils/dbConfig";
import { initDB } from "react-indexed-db";
import { NETWORKS } from "./utils";
import Login from "./screens/Login";
initDB(DBConfig);
const App = () => {
  useEffect(() => {
    try {
      const isNetworkSet = window.localStorage.getItem("bit-current-network");
      if (!isNetworkSet) {
        window.localStorage.setItem(
          "bit-current-network",
          JSON.stringify(NETWORKS[0])
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className=" bg-dark min-h-screen text-white">
      <Toaster />
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
