import React, { useState } from "react";
import { MdPhone } from "react-icons/md"; // Telefon uchun icon

const PhoneInput = () => {
  const [phone, setPhone] = useState("+998 ");

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 9); // faqat 9 ta raqam
    const part1 = cleaned.slice(0, 2);
    const part2 = cleaned.slice(2, 5);
    const part3 = cleaned.slice(5, 7);
    const part4 = cleaned.slice(7, 9);

    let formatted = "+998 ";
    if (part1) formatted += part1;
    if (part2) formatted += "-" + part2;
    if (part3) formatted += "-" + part3;
    if (part4) formatted += "-" + part4;

    return formatted;
  };

  const handleChange = (e) => {
    let input = e.target.value;

    if (input.startsWith("+998")) {
      input = input.slice(5);
    }

    const formatted = formatPhoneNumber(input);
    setPhone(formatted);
  };

  return (
    <div className="w-full flex items-center bg-gray-600 p-3 rounded-xl gap-2">
      <MdPhone className="text-white text-lg" />
      <input
        type="tel"
        placeholder="Enter Phone"
        value={phone}
        onChange={handleChange}
        className="text-zinc-300 placeholder-zinc-400 bg-transparent border-0 w-full outline-none text-sm md:text-base"
      />
    </div>
  );
};

export default PhoneInput;
