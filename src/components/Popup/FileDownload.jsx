import axios from "axios";
import config from "../config";

const handleDownloadPdf = async (pdfId, fileName, setLoading) => {
  try {
    setLoading(true);
    const pdfUrl = `${config.BASE_URL}/api/generate/${pdfId}/download/`;
    const response = await axios.get(pdfUrl, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || "document.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    alert("PDF yuklab olishda xatolik yuz berdi");
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export default handleDownloadPdf;
