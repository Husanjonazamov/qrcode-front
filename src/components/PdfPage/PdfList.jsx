import { useState, useEffect } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { FaDownload, FaTrashAlt, FaEdit, FaFilePdf } from "react-icons/fa"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa" // Added for pagination arrows
import axios from "axios"
import config from "../config"
import handleDownloadPdf from "../FileDownload/FileDownload"



const PdfList = ({ items = [], setItems }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [apiItems, setApiItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState({ next: null, previous: null });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.BASE_URL}/api/generate/?page=${page}`);
        const result = response.data;
        if (result?.data?.results && Array.isArray(result.data.results)) {
          setApiItems(result.data.results);
          setPaginationLinks(result.data.links || { next: null, previous: null });
          setTotalPages(result.data.total_pages || 1);
          setCurrentPage(result.data.current_page || page); 
        } else {
          console.error("Unexpected response format:", result);
          setApiItems([]);
          setPaginationLinks({ next: null, previous: null });
        }
        setLoading(false);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
        setLoading(false);
      }
    };
    fetchItems();
  }, [page]);

  

  const handleDelete = (index) => {
    if (setItems) {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
      localStorage.setItem("pdfItems", JSON.stringify(updated));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DOWNLOAD":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ERROR":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      case "NEW ADDED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleClickOutside = () => {
    setOpenMenuIndex(null);
  };

  const goToPreviousPage = () => {
    if (paginationLinks.previous) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const goToNextPage = () => {
    if (paginationLinks.next) {
      setPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  if (loading) {
    return <div className="mt-8 text-center text-gray-600">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-600">{error}</div>;
  }

  if (apiItems.length === 0) {
    return (
      <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-400">
        <FaFilePdf className="mx-auto mb-4 text-4xl" />
        <p className="text-lg font-medium">📁 Hozircha hech qanday PDF fayl mavjud emas.</p>
        <p>Yangi fayl qo'shish uchun yuqoridagi tugmadan foydalaning.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200" onClick={handleClickOutside}>
      {/* Existing Mobile View */}
      <div className="block md:hidden">
        <div className="space-y-4 p-4">
          {apiItems.map((item, index) => (
            
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status || "ON GOING")}`}
                  >
                    {item.status || "ON GOING"}
                  </span>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuIndex(openMenuIndex === index ? null : index)
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-150"
                  >
                    <FiMoreVertical className="w-4 h-4" />
                  </button>
                  {openMenuIndex === index && (
                    <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadPdf(item.id, `${item.owner}.pdf`)
                            setOpenMenuIndex(null)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        >
                          <FaDownload className="w-3 h-3" />
                          Download
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            alert("✏️ Tahrirlash bosildi")
                            setOpenMenuIndex(null)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        >
                          <FaEdit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(index)
                            setOpenMenuIndex(null)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
                        >
                          <FaTrashAlt className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-gray-900 text-sm">📋 {item.purpose}</p>
                  <p className="text-xs text-gray-500">{item.client || "Mijoz nomi mavjud emas"}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>ID: {item.id}</span>
                  <span>Amount: ${item.valuation_amount}</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center">
                      {(item.owner || "User")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-gray-900">{item.owner || "Unknown User"}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => handleDownloadPdf(item.id, `${item.owner}.pdf`)}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors duration-150"
                  >
                    Yuklab olish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700 w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[250px]">Item Details</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[120px]">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[80px] hidden lg:table-cell">ID</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[100px]">Valuation Amount</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[120px] hidden xl:table-cell">
                Client
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[180px] hidden lg:table-cell">
                Owner
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-900 text-sm">📋 {item.purpose}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.client || "Mijoz nomi mavjud emas"}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status || "ON GOING")}`}
                  >
                    {item.status || "ON GOING"}
                  </span>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <span className="font-mono text-sm text-gray-600">{item.id}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">${item.valuation_amount}</span>
                </td>
                <td className="py-4 px-6 hidden xl:table-cell">
                  <span className="text-sm text-gray-900">{item.client}</span>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center">
                        {(item.owner || "User")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{item.owner || "Unknown User"}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadPdf(item.id, `${item.owner}.pdf`)}
                      className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-150"
                    >
                      Yuklab olish
                    </button>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMenuIndex(openMenuIndex === index ? null : index)
                        }}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-150"
                      >
                        <FiMoreVertical className="w-4 h-4" />
                      </button>
                      {openMenuIndex === index && (
                        <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownloadPdf(item.id, `${item.owner}.pdf`)
                                setOpenMenuIndex(null)
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                            >
                              <FaDownload className="w-3 h-3" />
                              Download
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                alert("✏️ Tahrirlash bosildi")
                                setOpenMenuIndex(null)
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                            >
                              <FaEdit className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(index)
                                setOpenMenuIndex(null)
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
                            >
                              <FaTrashAlt className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 flex-wrap gap-4">
        <button
          onClick={goToPreviousPage}
          disabled={!paginationLinks.previous}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
            paginationLinks.previous
              ? "bg-teal-700 hover:bg-teal-800 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaChevronLeft className="w-4 h-4" />
          Oldingi
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pageNumber) => pageNumber >= page - 3 && pageNumber <= page + 3)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  pageNumber === page
                    ? "bg-teal-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={!paginationLinks.next}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
            paginationLinks.next
              ? "bg-teal-700 hover:bg-teal-800 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Keyingi
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

export default PdfList