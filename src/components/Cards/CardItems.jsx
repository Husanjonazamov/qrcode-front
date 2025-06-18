import React from "react";

const CardItem = ({ item }) => {
    return (
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-5 
        mt-0 md:mt-5 shadow-xl transition duration-300
        dark:bg-white dark:text-slate-900 sm:flex-1 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-medium">{item.title}</h3>
            </div>
            <h1 className="text-2xl font-bold">{item.count}</h1>
        </div>
    );
};


export default CardItem;