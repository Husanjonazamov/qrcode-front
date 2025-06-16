import React from "react";



const MenuItem = ({ icon: Icon, name, isOpen, isLgout }) => {
    return (
        <div className={`m-2 flex cursor-pointer itens-center space-x-4 rounded-md px-4 py-3 text-gray-400 duration-500
        hover:bg-teal-700 hover:text-white active:bg-teal-100
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