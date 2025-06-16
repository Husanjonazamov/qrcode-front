import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import MenuItem from "./MenuItem";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { menuItems } from "../constants";
import { icons } from "lucide-react";


const SideBar = ({ isOpen, toggleSidebar }) => {
    return (
        <div 
        className={`fixed left-0 top-0 h-full bg-slate-800
            text-white transition-all z-50 flex flex-col duration-300 dark:bg-slate-700 ${isOpen ? "w-44" : "w-16 items-center"}
            `}
        >
            <div className="flex items-center justify-center py-4">
                <LuLayoutDashboard 
                className={`text-2xl text-teal-700 transition-all ${
                    isOpen ? "w-12" : "w-8"
                }`}
                />
            </div>

            {/* menu list  */}

            <div className="mt-6 flex-1">
                {menuItems.map((item, index) => (
                    <MenuItem 
                        key={index}
                        icon={item.icon}
                        name={item.name}
                        isOpen={isOpen}
                        isLgout={item.isLgout}
                    />
                ))}
            </div>

            <button onClick={toggleSidebar}
            className="m-2 flex items-center justify-center rounded-md bg-gray-700 p-3 text-2xl font-bold hover:bg-teal-500 duration-300"
            >

                {isOpen ? <RiArrowLeftWideFill /> :
                <RiArrowRightWideFill />
                }

            </button>

        </div>

    )
} 

export default SideBar;