import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
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
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
