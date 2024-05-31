import React, { useEffect, useState } from "react";

export default function AddedPopup({show , message}) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  }, [show]);
  return (
    <div
      className={`fixed bottom-0 right-0 transform  -translate-x-1/2 -translate-y-1/2 bg-[#A1EB99] px-6 py-4 font-semibold border border-gray-300 rounded-lg shadow-lg transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
