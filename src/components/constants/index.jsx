import { FaHome, FaFileAlt } from "react-icons/fa";


export const menuItems = [
    {
        icon: FaHome,
        name: "Home",
        path: "/dashboard",
    },
    {
        icon: FaFileAlt,
        name: "PDF qo'shish",
        path: "/dashboard/pdf",
    }
]


import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaChartBar } from "react-icons/fa";

export const cardItems = [
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
];
