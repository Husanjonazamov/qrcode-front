import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PdfModel from "./AddItems";




const PdfPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg relative">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800">📄 PDF Fayllar</h2>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white 
                    font-medium px-4 py-2 sm:px-2.5 rounded-lg shadow-md transition duration-300 text-sm sm:text-base"
                >
                    <FaPlus className="text-sm" />
                    PDF qo'shish
                </button>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
                Bu sahifada PDF fayllarni yuklab qo'shishingiz, tahrirlashingiz va boshqarishingiz mumkin.
            </p>

            <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-400">
                <p>📁 Hozircha hech qanday PDF fayl mavjud emas.</p>
                <p>Yangi fayl qo‘shish uchun yuqoridagi tugmadan foydalaning.</p>
            </div>

            <PdfModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default PdfPage;
