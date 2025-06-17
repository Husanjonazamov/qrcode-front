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
    <div
      className=" min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-10 text-white"
    >
      <div className="bg-opacity-60 w-full max-w-5xl rounded-xl p-10 shadow-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-800">"Sifat Baxolash" MCHJ</h1>
          <h2 className="text-xl mt-2 text-teal-700">Xulosa raqami: <span className="text-teal-400">№{data?.number}</span></h2>
          <p className="mt-1 text-zinc-400">Sanasi: {data?.date || '21.05.2025'}</p>

        </div>

        {/* Body */}
        <div className="bg-white text-black rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium">
            <div className="">
              <p>MASHINA KATEGORIYASI: {data?.category || "CHEVROLET"}</p>
              <p>MASHINA MARKASI: {data?.brand || "COBALT"}</p>
              <p>DAVLAT RAQAMI: {data?.plate_number || "75 G 875 AB"}</p>
              <p>ISHLAB CHIQARILGAN SANASI: {data?.year || "01.01.2025"}</p>
              <p>RANGI: {data?.color || "KULRANG SON OF A GUN GRAY"}</p>
              <p>KUZOV: {data?.vin || "XWBJA69VESA102191"}</p>
              <p>TPS: {data?.tps_number || "AAG 6232940"}</p>
              <p>TPS BERILGAN SANASI: {data?.tps_date || "16.05.2025"}</p>
              <p>TPS KIM TOMONIDAN: {data?.tps_given_by || "TOSHKENT SH."}</p>
              <p>TURI: {data?.type || "YENGIL SEDAN"}</p>
            </div>

            <div>
              <p>MULK EGASI: {data?.owner || "HAMIDOV X. B."}</p>
              <p>BUYURTMACHI: {data?.client || "HAMIDOV X. B."}</p>
              <p>BAXOLASH MAQSADI: {data?.purpose || "KREDIT UCHUN"}</p>
              <p>XULOSA OBYEKTINING BAHOSI: <span className="bg-blue-100 text-teal-800 px-2 py-1 rounded">
                {parseFloat(data?.valuation_amount || 60106581).toLocaleString("uz-UZ")} so‘m
              </span></p>
              <div className="mt-4">
                <img
                  src={data?.qr_code_url || "/order_qr.png"}
                  alt="ORDER QR CODE IMAGE"
                  className="w-40 h-40 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-slate-500 p-8">
        2025. Felix-its solution
      </div>
    </div>
  );

}

export default ViewPdfPage;
