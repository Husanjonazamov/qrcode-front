import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { FaUser, FaFileAlt, FaBullseye, FaMoneyBillWave } from "react-icons/fa";



function ViewPdfPage() {
  const { id } = useParams();
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/generate/decode/${id}/`
        );

        if (!response.data.pdf_url) {
          throw new Error("PDF topilmadi");
        }

        setData(response.data);
      } catch (err) {
        console.error("Xatolik:", err);
        setError("PDF topilmadi yoki yuklashda muammo yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }
    
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-teal-700">"Sifat Baxolash" MCHJ</h1>
        <h2 className="text-xl mt-2 bg-teal-700 text-white inline-block px-4 py-1 rounded-lg">
          Sanasi: 21.05.2025
        </h2>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <img src="/favicon.svg" alt="Logo" className="w-15 h-15 object-contain" />
        </div>

        <ul className="space-y-4 text-sm md:text-base text-gray-800">
          <li className="flex items-center gap-2">
            <span className="font-semibold text-sm uppercase">Mulk egasi:</span>
            <span>{data?.owner || "HAMIDOV X. B."}</span>
          </li>

          <li className="flex items-center gap-2">
            <span className="font-semibold text-sm uppercase">Buyurtmachi:</span>
            <span>{data?.client || "HAMIDOV X. B."}</span>
          </li>

          <li className="flex items-center gap-2">
            <span className="font-semibold text-sm uppercase">Baxolash maqsadi:</span>
            <span>{data?.purpose || "KREDITNI TA'MINLASH"}</span>
          </li>

          <li className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm uppercase">Xulosa obyekti baxolangan narx:</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
              {parseFloat(data?.valuation_amount || 60106581).toLocaleString("uz-UZ")} so‘m
            </span>
          </li>
        </ul>
      </div>

      <div className="text-center mt-10 text-gray-500">
        2025. Felix-Its solution
      </div>
    </div>
  )

}

export default ViewPdfPage;
