import React from "react";
import FileUpload from "./FileUpload";

const PdfModel = ({ onClose, isOpen }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-500"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-lg border-l border-gray-200 overflow-y-auto transform transition-transform duration-500 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-2xl font-semibold text-slate-800">
                        📄 PDF Qo‘shish
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                <form className="space-y-4 p-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Mashina nomi</label>
                        <input
                            type="text"
                            placeholder="BMW"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Mashina yili</label>
                        <input
                            type="text"
                            placeholder="2025"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Ishlab chiqarilgan joy</label>
                        <input
                            type="text"
                            placeholder="Germany"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <FileUpload />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                        >
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PdfModel;
