import React from "react";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";


const MainContent = ({ isOpen, darkMode, toggleDarkMode }) => {
    return (
        <div className={`flex-1 bg-slate-200 ${
            isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 dark:bg-slate-800`}>
            <Header 
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
            />
            <Cards />
        </div>
    );
};

export default MainContent;
