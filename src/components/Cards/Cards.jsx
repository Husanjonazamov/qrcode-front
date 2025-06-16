import React from "react";
import { cardItems } from "../constants";
import  CardItem  from "../Cards/CardItems";


const Cards = () => {
    return (
        <div className="mt-5 translate-all flex flex-wrap gap-3 p-4 sm:px-7 inset-shadow-sm duration-300 sm:px-7 bg-white">
            {cardItems.map((item, index) => (
                <CardItem item={item} key={index} />
            ))}
        </div>
    )
}

export default Cards;