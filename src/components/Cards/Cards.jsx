import React, { useEffect, useState } from "react";
import CardItem from "../Cards/CardItems";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";
import axios from "axios";
import config from "../config";

const Cards = () => {
    const [stats, setStats] = useState({
        daily: 0,
        weekly: 0,
        monthly: 0,
        total: 0,
    });

    useEffect(() => {
        axios.get(`${config.BASE_URL}/api/generate/stats/`)
            .then(res => {
                setStats(res.data.data);
            })
            .catch(err => {
                console.error("Statsni yuklashda xatolik:", err);
            });
    }, []);

    const cardItems = [
        {
            title: "Kunlik",
            count: stats.daily,
            icon: <FaCalendarDay className="text-2xl text-blue-500" />,
        },
        {
            title: "Haftalik",
            count: stats.weekly,
            icon: <FaCalendarWeek className="text-2xl text-green-500" />,
        },
        {
            title: "Oylik",
            count: stats.monthly,
            icon: <FaCalendarAlt className="text-2xl text-orange-500" />,
        },
        {
            title: "Jami",
            count: stats.total,
            icon: <FaLayerGroup className="text-2xl text-purple-500" />,
        },
    ];

    return (
        <div className="mt-5 translate-all flex flex-wrap gap-3 p-4 sm:px-7 inset-shadow-sm duration-300 bg-white">
            {cardItems.map((item, index) => (
                <CardItem item={item} key={index} />
            ))}
        </div>
    );
};

export default Cards;
