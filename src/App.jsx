import React, { useState } from "react";
import FloatingInput from "./components/FloatingInput";
import AddTaskButton from "./components/AddTaskButton";
import TaskCard from "./components/TaskCard";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./ThemeContext";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const { theme } = useTheme();

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const task = {
        ...newTask,
        id: Date.now(),
        isLiked: false,
        createdAt: new Date().toLocaleString("fa-IR"),
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "" });
      toast.success("تسک با موفقیت اضافه شد!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: theme === "dark" ? "#1a1a1a" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          border: "1px solid #3b82f6",
        },
      });
    } else {
      toast.error("لطفا عنوان و توضیحات را وارد کنید!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: theme === "dark" ? "#1a1a1a" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          border: "1px solid #ef4444",
        },
      });
    }
  };

  const handleLike = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isLiked: !task.isLiked } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success(`تسک "${taskToDelete.title}" با موفقیت حذف شد!`, {
      duration: 3000,
      position: "top-center",
      style: {
        background: theme === "dark" ? "#1a1a1a" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        border: "1px solid #3b82f6",
      },
    });
  };

  const handleEdit = (taskId) => {
    // TODO: Implement edit functionality
    console.log("Edit task:", taskId);
  };

  // فیلتر تسک‌ها بر اساس جست‌وجو و فیلتر لایک‌شده‌ها
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesLiked = showOnlyLiked ? task.isLiked : true;
    return matchesSearch && matchesLiked;
  });

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-dark text-white"
          : "min-h-screen bg-white text-black"
      }
    >
      <Toaster />
      <header
        className={
          theme === "dark"
            ? "bg-dark-lighter py-6 shadow-lg"
            : "bg-blue-100 py-6 shadow-lg"
        }
      >
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <h1
            className={
              theme === "dark"
                ? "text-3xl font-bold text-center text-primary"
                : "text-3xl font-bold text-center text-blue-600"
            }
          >
            <i className="fas fa-tasks ml-2"></i>
            مدیریت تسک‌ها
          </h1>
          <ThemeToggleButton />
        </div>
      </header>

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className={`glass-box p-6 mb-8 max-w-4xl mx-auto shadow-lg`}>
            <div className="flex p-2 gap-1 mb-4">
              <div className="circle">
                <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
            </div>
            {/* بخش جست‌وجو و فیلتر */}
            <div className="flex flex-col sm:flex-row gap-2 items-center mb-6 justify-between sm:justify-start">
              <div className="relative w-full sm:w-auto flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="جست‌وجوی تسک..."
                  className={
                    theme === "dark"
                      ? "search-input shadow-lg focus:border-2 border-gray-300 px-6 py-3 rounded-2xl w-full sm:w-72 transition-all focus:w-full outline-none bg-gray-800/80 text-white placeholder-gray-300 font-bold text-lg pr-12 text-right"
                      : "search-input shadow-lg focus:border-2 border-blue-300 px-6 py-3 rounded-2xl w-full sm:w-72 transition-all focus:w-full outline-none bg-white text-black placeholder-gray-400 font-bold text-lg pr-12 text-right border border-blue-200"
                  }
                  name="search"
                  dir="rtl"
                />
                <svg
                  className={
                    theme === "dark"
                      ? "search-svg w-7 h-7 absolute top-1/2 left-3 -translate-y-1/2 text-primary pointer-events-none"
                      : "search-svg w-7 h-7 absolute top-1/2 left-3 -translate-y-1/2 text-blue-400 pointer-events-none"
                  }
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <button
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-b from-primary to-blue-700 shadow hover:shadow-lg transition-all duration-300 font-bold text-base h-[52px] sm:h-auto ${
                  showOnlyLiked ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setShowOnlyLiked((v) => !v)}
                style={{ marginRight: 0 }}
              >
                <i
                  className={`fas fa-heart${
                    showOnlyLiked
                      ? " text-red-500"
                      : theme === "dark"
                      ? " text-white"
                      : " text-blue-600"
                  }`}
                ></i>
                فقط علاقه‌مندی‌ها
              </button>
            </div>
            <div className="card__content">
              <FloatingInput
                label="عنوان تسک"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
                icon="fas fa-heading"
              />
              <div className="mt-4">
                <FloatingInput
                  label="توضیحات"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  required
                  icon="fas fa-align-left"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <AddTaskButton onClick={handleAddTask}>
                  افزودن تسک
                </AddTaskButton>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div
                className={`text-center py-12 rounded-xl ${
                  theme === "dark" ? "bg-dark-lighter" : "bg-gray-50"
                } animate-fade-in`}
              >
                <i className="fas fa-clipboard-list text-6xl text-gray-600 mb-4"></i>
                <p className="text-gray-400 text-xl">
                  هیچ تسکی مطابق جست‌وجوی شما پیدا نشد 😴
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  isLiked={task.isLiked}
                  onLike={() => handleLike(task.id)}
                  onDelete={() => handleDelete(task.id)}
                  onEdit={() => handleEdit(task.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <footer
        className={
          theme === "dark"
            ? "bg-dark-lighter py-4 mt-8"
            : "bg-blue-100 py-4 mt-8"
        }
      >
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="animate-text">
            ساخته شده توسط{" "}
            <span
              className={
                theme === "dark"
                  ? "text-primary font-semibold"
                  : "text-blue-600 font-semibold"
              }
            >
              mohamad majidian
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
