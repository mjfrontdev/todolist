import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const menuItems = [
  { to: "/", icon: "fa-home", label: "خانه / تسک‌ها" },
  { to: "/profile", icon: "fa-user-circle", label: "پروفایل کاربر" },
  { to: "/categories", icon: "fa-layer-group", label: "دسته‌بندی تسک‌ها" },
  { to: "/completed", icon: "fa-check-double", label: "تسک‌های تکمیل‌شده" },
  { to: "/settings", icon: "fa-cog", label: "تنظیمات" },
  { to: "/about", icon: "fa-info-circle", label: "درباره ما" },
];

const Sidebar = ({ isOpen, onClose, isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 h-full w-64 z-50 shadow-2xl backdrop-blur-xl flex flex-col p-6 gap-4 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800/95 text-white"
              : "bg-white/95 text-gray-700"
          }`}
          style={{ borderTopRightRadius: 32, borderBottomRightRadius: 32 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="font-bold text-lg">منو</div>
            <button
              onClick={onClose}
              className={`text-2xl transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-red-400"
                  : "text-gray-400 hover:text-red-400"
              }`}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200 ${
                    location.pathname === item.to
                      ? "bg-indigo-500 text-white shadow-lg"
                      : isDarkMode
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={onClose}
                >
                  <i className={`fas ${item.icon} text-xl`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                className={`flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200 ${
                  isDarkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  onClose();
                  toast.success("خروج انجام شد!", { duration: 2000 });
                  setTimeout(() => navigate("/"), 1000);
                }}
              >
                <i className="fas fa-sign-out-alt text-xl"></i>
                خروج
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 