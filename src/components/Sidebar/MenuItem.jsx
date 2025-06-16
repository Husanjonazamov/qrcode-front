import React from "react";
import { useLocation, useNavigate } from "react-router-dom";



const MenuItem = ({ icon: Icon, name, path, isOpen, isLgout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === path;

    const handleClick = () => {
        navigate(path);
    }


    return (
        <div 
        onClick={handleClick}
        className={`m-2 flex cursor-pointer itens-center space-x-4 rounded-md px-4 py-3 duration-300
        ${isActive ? "bg-teal-700" : "text-gray-400 hover:bg-teal-700 hover:text-white"}
        ${
            isLgout ? "mt-auto hidden" : ""
        }
        `}>
            <Icon className="text-xl"/>
            { isOpen && <span className="text-[14px] overflow-hidden">{name}</span> }
        </div>
    )
}


export default MenuItem;