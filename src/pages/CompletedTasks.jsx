import React from "react";
import { motion } from "framer-motion";

const CompletedTasks = () => {
  // بعداً می‌توان لیست واقعی را از props یا context گرفت
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center min-h-[60vh] animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-6">تسک‌های تکمیل‌شده</h2>
      <div className="text-gray-400 mt-8">هنوز هیچ تسک تکمیل‌شده‌ای وجود ندارد.</div>
    </motion.div>
  );
};

export default CompletedTasks; 