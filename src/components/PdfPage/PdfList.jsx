"use client"

import { useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { FaDownload, FaTrashAlt, FaEdit, FaFilePdf } from "react-icons/fa"

const ItemsPage = ({ items = [], setItems }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null)

  const sampleItems = [
    {
      id: "25678",
      name: "Toyota Camry",
      year: "2023",
      country: "Japan",
      fileName: "toyota-camry-manual.pdf",
      status: "ON GOING",
      paymentStatus: "CHEQUE",
      attendees: 5,
      date: "Monday 12th Sept.",
      time: "10 AM to 2 PM",
      avatar: "/placeholder.svg?height=32&width=32",
      userName: "Abigail Carlos",
    }
  ]

  const displayItems = items.length > 0 ? items : sampleItems

  const handleDelete = (index) => {
    if (setItems) {
      const updated = items.filter((_, i) => i !== index)
      setItems(updated)
      localStorage.setItem("pdfItems", JSON.stringify(updated))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "ON GOING":
        return "bg-green-100 text-green-800 border-green-200"
      case "UP COMING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "FINISHED":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200"
      case "NEW ADDED":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "CHEQUE":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "ONLINE BANKING":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "CASH":
        return "bg-green-100 text-green-800 border-green-200"
      case "NOT PAID":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleClickOutside = () => {
    setOpenMenuIndex(null)
  }

  if (displayItems.length === 0) {
    return (
      <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-400">
        <FaFilePdf className="mx-auto mb-4 text-4xl" />
        <p className="text-lg font-medium">📁 Hozircha hech qanday PDF fayl mavjud emas.</p>
        <p>Yangi fayl qo'shish uchun yuqoridagi tugmadan foydalaning.</p>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200" onClick={handleClickOutside}>
      <div className="block md:hidden">
        <div className="space-y-4 p-4">
          {displayItems.map((item, index) => (
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
                            alert("📥 Yuklab olish bosildi")
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
                  <p className="font-medium text-gray-900 text-sm">🚘 {item.name}</p>
                  <p className="text-xs text-gray-500">{item.fileName || "Fayl nomi mavjud emas"}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Year: {item.year}</span>
                  <span>Country: {item.country}</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.avatar || "/placeholder.svg?height=24&width=24"}
                      alt={item.userName || "User"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                    <div
                      className="w-full h-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center"
                      style={{ display: "none" }}
                    >
                      {(item.userName || "User")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-gray-900">{item.userName || "Unknown User"}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors duration-150">
                    Yuklab olish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[100px]">Year</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[120px] hidden xl:table-cell">
                Country
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[180px] hidden lg:table-cell">
                Owner
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-900 text-sm">🚘 {item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.fileName || "Fayl nomi mavjud emas"}</p>
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
                  <span className="font-mono text-sm text-gray-600">{item.id || `${25000 + index}`}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">{item.year}</span>
                </td>
                <td className="py-4 px-6 hidden xl:table-cell">
                  <span className="text-sm text-gray-900">{item.country}</span>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.avatar || "/placeholder.svg?height=32&width=32"}
                        alt={item.userName || "User"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none"
                          e.target.nextSibling.style.display = "flex"
                        }}
                      />
                      <div
                        className="w-full h-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center"
                        style={{ display: "none" }}
                      >
                        {(item.userName || "User")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{item.userName || "Unknown User"}</span>
                      <span className="text-xs text-gray-500">{item.attendees || 0} Attendees</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-150">
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
                                alert("📥 Yuklab olish bosildi")
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
    </div>
  )
}

export default ItemsPage
