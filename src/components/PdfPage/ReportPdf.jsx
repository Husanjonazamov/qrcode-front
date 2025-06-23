import React, { useRef, useState } from "react";



const ReportFileUpload = ({ onFileSelect }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            alert("Iltimos, faqat PDF formatdagi hisobot faylini yuklang.");
            setFileName("");
            onFileSelect(null);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
                Hisobot faylini yuklash
            </label>

            <div
                onClick={triggerFileInput}
                className="w-full h-32 border-2 border-dashed border-red-600 rounded-md flex items-center justify-center cursor-pointer hover:border-teal-500 transition"
            >
                {fileName ? (
                    <span className="text-teal-700 font-medium truncate max-w-[90%]">{fileName}</span>
                ) : (
                    <span className="text-gray-500">
                        📄 Bu yerga hisobot faylini yuklang (PDF)
                    </span>
                )}
            </div>

            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default ReportFileUpload;
