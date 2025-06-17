import React from "react";
import axios from "axios";

import config from "../config";



const handleDelete = async (id, onSuccess, onError) => {
  try {
    const confirmed = window.confirm("Haqiqatan ham o‘chirmoqchimisiz?");
    if (!confirmed) return;
    
    await axios.delete(`${config.BASE_URL}/api/generate/${id}/`);
    
    
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("O'chirishda xatolik:", error);
    alert("O'chirishda xatolik yuz berdi");
    if (onError) onError(error);
  }
};

export default handleDelete;