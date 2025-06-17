// src/components/ViewPdf/ViewPdfPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config"; 

export default function ViewPdfPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/api/generate/${id}/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, [id]);

  if (!data) return <p className="text-center mt-10">Yuklanmoqda...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buyurtmachi: {data.client}</h1>
      <iframe
        src={data.pdf_url}
        width="100%"
        height="700px"
        title="PDF ko‘rish"
        className="border rounded"
      />
    </div>
  );
}
