import React from "react";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaChartBar } from "react-icons/fa";


const cards = [
    {
        title: "Kunlik statistika",
        count: "5",
        icon: <FaCalendarDay size={30} className="text-blue-500" />
    },
    {
        title: "Haftalik statistika",
        count: "20",
        icon: <FaCalendarWeek size={30} className="text-green-500" />
    },
    {
        title: "Oylik statistika",
        count: "64",
        icon: <FaCalendarAlt size={30} className="text-purple-500" />
    },
    {
        title: "Umumiy statistika",
        count: "434",
        icon: <FaChartBar size={30} className="text-orange-500" />
    },
]



const Cards = () => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold  text-gray-800 mb-4">Statistika</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map(({ title, count, icon }, key) => (
                    <div key={key} className="
                        bg-zinc-200/40 backdrop-blur-md rounded-xl shadow-md
                        p-6 min-h-[140px] flex items-center justify-between
                        hover:shadow-xl transition-all"
                    >
                        <div>
                            <p className="text-gray-500 text-sm">{title}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{count}</h3>    
                        </div>
                        <div className="bg-gray-100 p-2 rounded-full">
                            {icon}    
                        </div>    
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Cards;