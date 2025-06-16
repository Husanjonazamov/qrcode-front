import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex items-center justify-between
      bg-white text-zinc-900 px-7 py-3 shadow-xl">
      <h1 className="font-bold">Dashboard</h1>
      <div className="flex items-center gap-4 relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <FaUser className="rounded-md bg-slate-600 p-2 text-4xl text-white" />
          <h2 className="font-medium">Admin</h2>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-20 w-48 bg-white text-[#EF4444] rounded-md shadow-2xl z-50 overflow-hidden animate-dropdown">

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-150 "
            >
              Log out
            </button>
          </div>


        )}
      </div>
    </div>
  );
};

export default Header;
