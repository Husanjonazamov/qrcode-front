import React, { useState } from "react";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import loginUser from "../Auth/Auth"; 



const LoginPage = () => {
  const [phone, setPhone] = useState("+998 ");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 9);
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

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    if (input.startsWith("+998")) {
      input = input.slice(5);
    }
    const formatted = formatPhoneNumber(input);
    setPhone(formatted);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(phone, password); 
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] max-w-sm md:max-w-md p-6 bg-white flex flex-col items-center gap-5 rounded-xl shadow-lg shadow-slate-400">
        <img src="/favicon.svg" alt="logo" className="w-12 md:w-14" />
        <h1 className="text-lg md:text-xl text-zinc-800 font-semibold">Welcome back</h1>

        {error && (
          <div className="w-full text-center text-red-500 text-sm bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center bg-gray-200 p-3 rounded-xl gap-2">
            <MdPhone className="text-zinc-700 text-lg" />
            <input
              type="tel"
              placeholder="Enter Phone"
              value={phone}
              onChange={handlePhoneChange}
              className="text-zinc-800 placeholder-zinc-500 bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          <div className="w-full flex items-center bg-gray-200 p-3 rounded-xl gap-2 relative">
            <FaFingerprint className="text-zinc-700 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-zinc-800 bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-4 text-zinc-700 text-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEye
                className="absolute right-4 text-zinc-700 text-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 transition text-white font-medium py-2 rounded-xl text-sm md:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
