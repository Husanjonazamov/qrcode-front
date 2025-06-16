import React from "react";
import config from "../config"




const loginUser = async (phone, password) => {
    const cleanedPhone = phone.replace(/\D/g, "");
    if (!cleanedPhone || !password) {
        throw new Error("Iltimos, barcha Maydonlarni to'ldiring");
    }

    const response = await fetch(`${config.BASE_URL}/auth/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            phone: cleanedPhone,
            password: password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Login muvaffaqiyatsiz");
    }

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    return true;
};


export default loginUser;