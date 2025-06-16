import React, { useState } from "react";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleDarkMode, darkMode }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="flex items-center justify-between bg-white px-7 py-3 dark:bg-slate-700 dark:text-gray-300 relative">
            <h1 className="font-bold">Dashboard</h1>
            <div className="flex items-center gap-4 relative">
                <button
                    className="rounded-md bg-slate-600 dark:bg-slate-600 dark:text-slate-300 duration-300"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? (
                        <FaSun className="p-2 text-4xl" />
                    ) : (
                        <FaMoon className="p-2 text-4xl" />
                    )}
                </button>

                <div className="relative">
                    <div
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 cursor-pointer select-none"
                    >
                        <FaUser className="rounded-md bg-slate-600 p-2 text-4xl dark:bg-slate-600 dark:text-slate-300" />
                        <h2 className="font-medium">Admin</h2>
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg dark:bg-slate-800 dark:border-slate-600">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
