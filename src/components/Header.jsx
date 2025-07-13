import React from "react";

const Header = ({ onMenu, isDarkMode, onToggleTheme, title }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <button
        className={`text-2xl ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}
        onClick={onMenu}
        title="باز کردن منو"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-700"}`}>{title}</div>
      <button
        onClick={onToggleTheme}
        className={`p-2 rounded-full transition-colors ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"}`}
        title={isDarkMode ? "تم روشن" : "تم تیره"}
      >
        <i className={`fas fa-${isDarkMode ? "sun" : "moon"}`}></i>
      </button>
    </div>
  );
};

export default Header; 