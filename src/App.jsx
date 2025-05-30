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

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const today = new Date();
  const todayStr = today.toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [showForm, setShowForm] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const demoBtnClass = `rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-md border border-gray-300/30 transition-all duration-200
    ${
      isDarkMode
        ? "bg-white/10 hover:bg-indigo-400/20"
        : "bg-white/80 hover:bg-indigo-100/80"
    }`;
  const demoIconClass = `${
    isDarkMode ? "text-indigo-200" : "text-indigo-500"
  } text-xl`;

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const task = {
        ...newTask,
        id: Date.now(),
        isLiked: false,
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
    setRemovingId(taskId);
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setRemovingId(null);
      toast.success("تسک با موفقیت حذف شد!", { duration: 2000 });
    }, 350);
  };

  const handleLike = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isLiked: !task.isLiked } : task
      )
    );
    toast.success("وضعیت علاقه‌مندی تغییر کرد!", { duration: 2000 });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
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
                    removingId === task.id
                      ? "opacity-40 scale-95 pointer-events-none"
                      : ""
                  } ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600"
                      : "bg-white/80 border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
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
                  <div className={`flex flex-col items-end gap-1 w-full`}>
                    <div
                      className={`flex items-center gap-3 px-2 py-1 rounded-2xl mb-1 shadow-md border border-gray-300/30 ${
                        isDarkMode ? "bg-white/5" : "bg-white/70"
                      }`}
                      style={{ backdropFilter: "blur(10px)" }}
                    >
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-2 rounded-full hover:bg-red-50 text-red-400 transition-all"
                        title="حذف"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        onClick={() => handleLike(task.id)}
                        className={`p-2 rounded-full hover:bg-blue-50 transition-all ${
                          task.isLiked
                            ? "text-blue-500"
                            : isDarkMode
                            ? "text-gray-300"
                            : "text-gray-400"
                        }`}
                        title="علاقه‌مندی"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-blue-50 text-blue-400 transition-all cursor-not-allowed"
                        title="ویرایش"
                        disabled
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                    <div
                      className={`flex items-center justify-center gap-2 px-2 py-1 rounded-2xl shadow border border-gray-200/30 ${
                        isDarkMode ? "bg-white/10" : "bg-white/90"
                      }`}
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.12,
                          boxShadow: "0 2px 8px #6366f1aa",
                        }}
                        className={demoBtnClass + " cursor-not-allowed"}
                        title="یادآور"
                        disabled
                      >
                        <i className={"fas fa-bell " + demoIconClass}></i>
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.12,
                          boxShadow: "0 2px 8px #6366f1aa",
                        }}
                        className={demoBtnClass + " cursor-not-allowed"}
                        title="زیرتسک"
                        disabled
                      >
                        <i className={"fas fa-list-ul " + demoIconClass}></i>
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.12,
                          boxShadow: "0 2px 8px #6366f1aa",
                        }}
                        className={demoBtnClass + " cursor-not-allowed"}
                        title="پیوست فایل"
                        disabled
                      >
                        <i className={"fas fa-paperclip " + demoIconClass}></i>
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.12,
                          boxShadow: "0 2px 8px #6366f1aa",
                        }}
                        className={demoBtnClass + " cursor-not-allowed"}
                        title="تکرارشونده"
                        disabled
                      >
                        <i className={"fas fa-redo " + demoIconClass}></i>
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.12,
                          boxShadow: "0 2px 8px #6366f1aa",
                        }}
                        className={demoBtnClass + " cursor-not-allowed"}
                        title="کامنت/یادداشت"
                        disabled
                      >
                        <i
                          className={"fas fa-comment-dots " + demoIconClass}
                        ></i>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

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

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className={`absolute left-1/2 -translate-x-1/2 bottom-24 w-[90%] backdrop-blur-xl rounded-2xl shadow-xl p-4 z-20 border ${
              isDarkMode
                ? "bg-gray-800/90 border-gray-700"
                : "bg-white/95 border-gray-200"
            }`}
          >
            <div className="mb-2">
              <FloatingInput
                label="عنوان تسک"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
                icon="fas fa-heading"
                className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}
              />
            </div>
            <div className="mb-2">
              <FloatingInput
                label="توضیحات"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
                icon="fas fa-align-left"
                className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}
              />
            </div>
            <div className="flex gap-2 mb-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 4px 16px #6366f1aa" }}
                className={demoBtnClass + " cursor-not-allowed"}
                title="یادآور"
                disabled
              >
                <i className={"fas fa-bell " + demoIconClass}></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 4px 16px #6366f1aa" }}
                className={demoBtnClass + " cursor-not-allowed"}
                title="زیرتسک"
                disabled
              >
                <i className={"fas fa-list-ul " + demoIconClass}></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 4px 16px #6366f1aa" }}
                className={demoBtnClass + " cursor-not-allowed"}
                title="پیوست فایل"
                disabled
              >
                <i className={"fas fa-paperclip " + demoIconClass}></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 4px 16px #6366f1aa" }}
                className={demoBtnClass + " cursor-not-allowed"}
                title="تکرارشونده"
                disabled
              >
                <i className={"fas fa-redo " + demoIconClass}></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 4px 16px #6366f1aa" }}
                className={demoBtnClass + " cursor-not-allowed"}
                title="کامنت/یادداشت"
                disabled
              >
                <i className={"fas fa-comment-dots " + demoIconClass}></i>
              </motion.button>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowForm(false)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                انصراف
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-lg bg-indigo-400 text-white font-bold hover:bg-indigo-500 transition-all"
              >
                افزودن
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
