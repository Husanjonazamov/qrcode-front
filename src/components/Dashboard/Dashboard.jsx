// Dashboard.jsx
import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`flex font-Montserrat ${
        darkMode ? "dark bg-slate-900" : "bg-slate-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 bg-slate-200 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 dark:bg-white`}
      >
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
