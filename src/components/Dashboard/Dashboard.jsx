import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import MainContent from "../Main/Main";

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
    <div className={`flex font-Montserrat ${darkMode ? "dark bg-slate-900" : "bg-slate-100"}`}>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <MainContent 
        isOpen={isOpen}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Dashboard;
