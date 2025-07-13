import React from "react";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center min-h-[60vh] animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-6">تنظیمات</h2>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex items-center justify-between p-4 rounded-xl shadow bg-white/80 dark:bg-gray-800/80">
          <span>اعلان‌ها</span>
          <input type="checkbox" className="form-checkbox w-5 h-5 text-indigo-500" />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl shadow bg-white/80 dark:bg-gray-800/80">
          <span>حالت تاریک</span>
          <input type="checkbox" className="form-checkbox w-5 h-5 text-indigo-500" checked readOnly />
        </div>
      </div>
    </motion.div>
  );
};

export default Settings; 