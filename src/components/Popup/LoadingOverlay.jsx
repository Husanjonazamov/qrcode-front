import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="px-6 py-4 rounded shadow text-center">
        <div className="w-6 h-6 mb-3 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-teal-400">Fayl yuklanmoqda, iltimos kuting...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
