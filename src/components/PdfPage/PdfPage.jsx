import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PdfModel from "./PdfModel";
import PdfList from "./PdfList";

const PdfPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pdfItems, setPdfItems] = useState(() => {
        return JSON.parse(localStorage.getItem("pdfItems")) || [];
    });

    const addPdfItem = (item) => {
        setPdfItems((prev) => [...prev, item]);
    };

    return (
        <div className="p-6 mt-5 bg-white rounded-xl shadow-lg relative">
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
            <PdfList items={pdfItems} setItems={setPdfItems} />

            <PdfModel isOpen={isOpen} onClose={() => setIsOpen(false)} addPdfItem={addPdfItem} />
        </div>
    );
};

export default PdfPage;
