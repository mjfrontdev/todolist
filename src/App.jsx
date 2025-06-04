import React, { useState } from "react";
import FloatingInput from "./components/FloatingInput";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const LABELS = [
  { name: "کار", color: "#6366f1" },
  { name: "مالی", color: "#fde047" },
  { name: "اجتماعی", color: "#f472b6" },
  { name: "شخصی", color: "#5eead4" },
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const FILTER_OPTIONS = [
  { id: "all", label: "همه تسک‌ها", icon: "fa-list" },
  { id: "completed", label: "تکمیل شده", icon: "fa-check-circle" },
  { id: "pending", label: "در انتظار", icon: "fa-clock" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const today = new Date();
  const todayStr = today.toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [showForm, setShowForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const task = {
        ...newTask,
        id: Date.now(),
        isLiked: false,
        isCompleted: false,
        label: LABELS[Math.floor(Math.random() * LABELS.length)],
      };
      setTasks([task, ...tasks]);
      setNewTask({ title: "", description: "" });
      setShowForm(false);
      toast.success("تسک با موفقیت اضافه شد!", { duration: 2500 });
    } else {
      toast.error("لطفا عنوان و توضیحات را وارد کنید!", { duration: 2500 });
    }
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("تسک با موفقیت حذف شد!", { duration: 2000 });
  };

  const handleLike = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isLiked: !task.isLiked } : task
      )
    );
    toast.success("وضعیت علاقه‌مندی تغییر کرد!", { duration: 2000 });
  };

  const handleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    toast.success("تسک انجام شد!", { duration: 2000 });
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleEditTask = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setEditingTask(null);
    toast.success("تسک با موفقیت ویرایش شد!", { duration: 2000 });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "completed" && task.isCompleted) ||
      (activeFilter === "pending" && !task.isCompleted);

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-[#f3f4f6]"
      }`}
      style={{ minHeight: "100dvh" }}
    >
      <AnimatePresence>
        {isSidebarOpen && (
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
                onClick={() => setIsSidebarOpen(false)}
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
              <li
                className={`flex items-center gap-3 cursor-not-allowed opacity-60 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <i
                  className={`fas fa-user-circle text-xl ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                ></i>
                پروفایل کاربر
              </li>
              <li
                className={`flex items-center gap-3 cursor-not-allowed opacity-60 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <i
                  className={`fas fa-layer-group text-xl ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                ></i>
                دسته‌بندی تسک‌ها
              </li>
              <li
                className={`flex items-center gap-3 cursor-not-allowed opacity-60 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <i
                  className={`fas fa-check-double text-xl ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                ></i>
                تسک‌های تکمیل‌شده
              </li>
              <li
                className={`flex items-center gap-3 cursor-not-allowed opacity-60 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <i
                  className={`fas fa-cog text-xl ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                ></i>
                تنظیمات
              </li>
              <li
                className={`flex items-center gap-3 cursor-not-allowed opacity-60 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <i
                  className={`fas fa-info-circle text-xl ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                ></i>
                درباره ما
              </li>
              <li
                className={`flex items-center gap-3 cursor-not-allowed opacity-60 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <i
                  className={`fas fa-sign-out-alt text-xl ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                ></i>
                خروج
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute -z-10 w-full h-full overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#a5b4fc] rounded-full blur-3xl opacity-60 -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 bg-[#f472b6] rounded-full blur-3xl opacity-60 -top-24 -right-32"></div>
        <div className="absolute w-96 h-96 bg-[#fef08a] rounded-full blur-3xl opacity-50 -bottom-32 -left-24"></div>
        <div className="absolute w-96 h-96 bg-[#5eead4] rounded-full blur-3xl opacity-50 -bottom-24 -right-24"></div>
      </div>
      <Toaster />
      <div
        className={`w-full max-w-md backdrop-blur-xl shadow-2xl rounded-[2.5rem] px-0 pt-6 pb-4 flex flex-col relative transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800/80 text-white" : "bg-white/90 text-gray-700"
        }`}
        style={{ minHeight: 600 }}
      >
        <div className="flex items-center justify-between px-6">
          <button
            className={`text-2xl ${
              isDarkMode ? "text-gray-300" : "text-gray-400"
            }`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <i className={`fas fa-${isDarkMode ? "sun" : "moon"}`}></i>
          </button>
        </div>

        <div className="px-6 mt-4">
          <div
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            سلام 👋
          </div>
          <div
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-400"
            }`}
          >
            {todayStr}
          </div>
        </div>

        <div className="px-6 mt-4">
          <FloatingInput
            label="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon="fas fa-search"
            className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}
          />
        </div>

        <div className="flex items-center justify-between px-6 mt-6 mb-2">
          {WEEKDAYS.map((d, i) => (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold ${
                i === 3
                  ? "bg-indigo-400 text-white"
                  : isDarkMode
                  ? "text-gray-300"
                  : "text-gray-400"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 px-6 mb-2 mt-2">
          {LABELS.map((l, i) => (
            <div key={i} className="flex items-center gap-1">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: l.color }}
              ></span>
              <span
                className={`text-xs font-bold ${
                  isDarkMode ? "text-gray-300" : "text-gray-400"
                }`}
              >
                {l.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 px-2 mt-2 overflow-y-auto pb-24">
          {/* Filter Buttons */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center gap-4 mb-4 px-4"
          >
            {FILTER_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(option.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  activeFilter === option.id
                    ? "bg-indigo-500 text-white shadow-lg"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <i className={`fas ${option.icon}`}></i>
                <span>{option.label}</span>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence initial={false}>
            {filteredTasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className={`text-center mt-16 ${
                  isDarkMode ? "text-gray-300" : "text-gray-400"
                }`}
              >
                هیچ تسکی ثبت نشده 😴
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className={`flex items-center justify-between backdrop-blur-md rounded-xl px-4 py-3 mb-3 shadow-md border relative ${
                    task.isCompleted ? "opacity-60" : ""
                  } ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600"
                      : "bg-white/80 border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleComplete(task.id)}
                      className={`text-xl ${
                        task.isCompleted ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      <i
                        className={`fas fa-${
                          task.isCompleted ? "check-circle" : "circle"
                        }`}
                      ></i>
                    </motion.button>
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ background: task.label.color }}
                    ></span>
                    <div>
                      <div
                        className={`font-bold text-sm ${
                          isDarkMode ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-400"
                        }`}
                      >
                        {task.description}
                      </div>
                    </div>
                  </div>
                  <div className={`flex flex-col items-end gap-1`}>
                    <div
                      className={`flex items-center gap-3 px-2 py-1 rounded-2xl shadow mb-1 border border-gray-300/30 ${
                        isDarkMode ? "bg-white/5" : "bg-white/70"
                      }`}
                      style={{ backdropFilter: "blur(10px)" }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(task.id)}
                        className="p-1 rounded-full hover:bg-red-50 text-red-400 transition-all"
                        title="حذف"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditClick(task)}
                        className="p-1 rounded-full hover:bg-blue-50 text-blue-400 transition-all"
                        title="ویرایش"
                      >
                        <i className="fas fa-edit"></i>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(task.id)}
                        className={`p-1 rounded-full hover:bg-blue-50 transition-all ${
                          task.isLiked
                            ? "text-blue-500"
                            : isDarkMode
                            ? "text-gray-300"
                            : "text-gray-400"
                        }`}
                        title="علاقه‌مندی"
                      >
                        <i className="fas fa-heart"></i>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Edit Task Modal */}
        <AnimatePresence>
          {editingTask && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`p-6 rounded-2xl shadow-2xl max-w-md w-full ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">ویرایش تسک</h3>
                <FloatingInput
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  label="عنوان"
                />
                <FloatingInput
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  label="توضیحات"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white"
                  >
                    انصراف
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditTask(editingTask)}
                    className="px-4 py-2 rounded-lg bg-indigo-500 text-white"
                  >
                    ذخیره
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Task Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`p-6 rounded-2xl shadow-2xl max-w-md w-full ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">افزودن تسک جدید</h3>
                <div className="mb-4">
                  <FloatingInput
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    label="عنوان"
                  />
                </div>
                <div className="mb-4">
                  <FloatingInput
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    label="توضیحات"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white"
                  >
                    انصراف
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddTask}
                    className="px-4 py-2 rounded-lg bg-indigo-500 text-white"
                  >
                    افزودن
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="absolute left-1/2 -translate-x-1/2 bottom-4 w-14 h-14 rounded-full bg-indigo-400 shadow-lg flex items-center justify-center text-white text-3xl hover:bg-indigo-500 transition-all z-10"
          onClick={() => setShowForm((v) => !v)}
          title="افزودن تسک"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.i
            className="fas fa-plus"
            animate={{ rotate: showForm ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.i>
        </motion.button>
      </div>
    </div>
  );
}

export default App;
