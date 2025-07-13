import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center min-h-[60vh] animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-6">درباره ما</h2>
      <p className="text-gray-400 max-w-md text-center">این برنامه برای مدیریت تسک‌ها با رابط کاربری مدرن و زیبا ساخته شده است. هدف ما ساده‌سازی مدیریت کارهای روزانه شماست.</p>
    </motion.div>
  );
};

export default About; 