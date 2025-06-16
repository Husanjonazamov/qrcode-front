import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6"
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Navbar from "./Navbar";

const Dashboard = () => {
    const menus = [
        {name: "dashboard", link: '/', icon: MdOutlineDashboard},
        {name: "Pdf qoshish", link: '/', icon: FaFilePdf},
    ];

    const [open, setOpen] = useState(true);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            setOpen(false);
        }
    }, []);

    return (
        <section className="flex gap-6">
            <div className={`bg-gradient-to-b from-zinc-800 to-zinc-700 min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-white px-4`}>
                <div className="py-3 flex justify-between bg-zinc">

                    {open && (
                        <h1 className="text-lg font-bold tracking-wide text-white">
                            PDf Convertor
                        </h1>
                    )}

                    <HiMenuAlt3 
                        size={26} 
                        className="cursor-pointer" 
                        onClick={() => setOpen(!open)} 
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {
                        menus.map((menu, i) => (
                            <Link 
                                to={menu.link}
                                key={i}
                                className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-zinc-600 rounded-lg"
                            >
                                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                                <h2 
                                    style={{ transitionDelay: `${i + 3}00ms` }}
                                    className={`whitespace-pre duration-500 ${
                                        !open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                                >
                                    {menu.name}
                                </h2>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="w-full">
                <div className="p-4">
                    <Cards />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
