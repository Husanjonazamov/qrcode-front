// Dashboard.jsx
import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
  <div className="flex font-Montserrat bg-white">
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 bg-slate-100 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 `}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
