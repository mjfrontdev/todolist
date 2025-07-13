import React from "react";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center mb-4 shadow-lg">
        <i className="fas fa-user text-5xl text-white"></i>
      </div>
      <h2 className="text-2xl font-bold mb-2">کاربر نمونه</h2>
      <p className="text-gray-400">ایمیل: example@email.com</p>
      <p className="text-gray-400 mt-2">خوش آمدید به پروفایل کاربری خود!</p>
    </motion.div>
  );
};

export default Profile; 