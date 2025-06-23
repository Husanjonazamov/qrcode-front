import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ReportFileUpload from "./ReportPdf";
import config from "../config";

const PdfModel = ({ onClose, isOpen, addPdfItem }) => {
    const [formData, setFormData] = useState({
        owner: "",
        client: "",
        purpose: "",
        valuation_amount: "",
        input_pdf: null,
        report_pdf: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputPdfSelect = (file) => {
        setFormData((prev) => ({ ...prev, input_pdf: file }));
    };

    const handleReportPdfSelect = (file) => {
        setFormData((prev) => ({ ...prev, report_pdf: file }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const apiData = new FormData();
        apiData.append("owner", formData.owner);
        apiData.append("client", formData.client);
        apiData.append("purpose", formData.purpose);
        apiData.append("valuation_amount", formData.valuation_amount);
        if (formData.input_pdf) apiData.append("input_pdf", formData.input_pdf);
        if (formData.report_pdf) apiData.append("report_pdf", formData.report_pdf);

        try {
            const response = await fetch(`${config.BASE_URL}/api/generate/`, {
                method: "POST",
                body: apiData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Yuborildi:", result);

                if (addPdfItem) addPdfItem(result);
                onClose();
                window.location.reload();
            } else {
                console.error("Xatolik:", await response.text());
            }
        } catch (error) {
            console.error("Serverga ulanishda xatolik:", error);
        } finally {
            setLoading(false);
        }
    };

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

                <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                    {/* Foydalanuvchi inputlari */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Mulk egasi (Owner ID yoki ism)
                        </label>
                        <input
                            type="text"
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Buyurtmachi (Client ID yoki ism)
                        </label>
                        <input
                            type="text"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Baholash maqsadi
                        </label>
                        <input
                            type="text"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Baholangan narx (so‘m)
                        </label>
                        <input
                            type="text"
                            name="valuation_amount"
                            value={formData.valuation_amount}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Fayl yuklovchilar */}
                    <FileUpload onFileSelect={handleInputPdfSelect} />
                    <ReportFileUpload onFileSelect={handleReportPdfSelect} />

                    {/* Tugmalar */}
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
                            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    Yuklanyapti...
                                </>
                            ) : (
                                "Saqlash"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PdfModel;
