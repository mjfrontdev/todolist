import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "کار", color: "#6366f1" },
  { name: "مالی", color: "#fde047" },
  { name: "اجتماعی", color: "#f472b6" },
  { name: "شخصی", color: "#5eead4" },
];

const Categories = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center min-h-[60vh] animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-6">دسته‌بندی تسک‌ها</h2>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {categories.map((cat, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl shadow bg-white/80 dark:bg-gray-800/80">
            <span className="inline-block w-4 h-4 rounded-full" style={{ background: cat.color }}></span>
            <span className="font-bold text-lg">{cat.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories; 