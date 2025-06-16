import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Tashqariga bosilganda menyuni yopish
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full flex justify-end items-center bg-white px-6 py-4 shadow">
            <div className="relative" ref={dropdownRef}>
                <img 
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                    onClick={() => setOpen(!open)}
                />
                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
                        <button 
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => console.log("Logout")}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
