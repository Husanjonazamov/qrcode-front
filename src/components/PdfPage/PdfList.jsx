import React, { useEffect, useState } from "react";



const PdfList = () => {
    const [pdfItems, setPdfItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("pdfItems")) || [];
        setPdfItems(storedItems);
    }, []);

    return (
        <div className="mt-8">
            {/* <h3 className="text-xl font-bold text-slate-800 mb-4">📄 Yuklangan PDF fayllar</h3> */}
            {pdfItems.length === 0 ? (
                <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-400">
                    <p>📁 Hozircha hech qanday PDF fayl mavjud emas.</p>
                    <p>Yangi fayl qo‘shish uchun yuqoridagi tugmadan foydalaning.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {pdfItems.map((item, index) => (
                        <li key={index} className="p-4 border rounded-md bg-white shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-800">🚘 {item.name} - {item.year} ({item.country})</p>
                                <p className="text-sm text-gray-500">{item.fileName || "Fayl nomi mavjud emas"}</p>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => {
                                    const updated = pdfItems.filter((_, i) => i !== index);
                                    setPdfItems(updated);
                                    localStorage.setItem("pdfItems", JSON.stringify(updated));
                                }}
                            >
                                ❌ O'chirish
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PdfList;
