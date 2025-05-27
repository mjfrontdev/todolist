import React, { useState, useEffect } from "react";
import FloatingInput from "./components/FloatingInput";
import PushButton from "./components/PushButton";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      setTasks([...tasks, { ...newTask, id: Date.now(), isLiked: false }]);
      setNewTask({ title: "", description: "" });
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
    setTasks(tasks.filter((task) => task.id !== taskId));
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
    <div className="min-h-screen bg-dark text-white transition-colors duration-500">
      <header className="bg-dark-lighter py-6 shadow-lg flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-primary flex-1">
          <i className="fas fa-tasks ml-2"></i>
          مدیریت تسک‌ها
        </h1>
        <button
          className="ml-0 md:ml-4 mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-primary to-blue-700 shadow hover:shadow-lg transition-all duration-300"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="تغییر تم"
        >
          {theme === "dark" ? (
            <i className="fas fa-sun text-yellow-400"></i>
          ) : (
            <i className="fas fa-moon text-gray-700"></i>
          )}
          <span className="hidden md:inline text-sm font-bold">
            {theme === "dark" ? "تم روشن" : "تم تیره"}
          </span>
        </button>
      </header>

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg mb-8 light:from-white light:to-light-card">
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
            <div className="flex flex-col md:flex-row gap-2 items-center mb-6">
              <div className="w-full md:w-80">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="جست‌وجوی تسک..."
                    className="search-input"
                    name="search"
                  />
                  <svg
                    className="search-svg"
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
              </div>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-b from-primary to-blue-700 shadow hover:shadow-lg transition-all duration-300 ${
                  showOnlyLiked ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setShowOnlyLiked((v) => !v)}
              >
                <i
                  className={`fas fa-heart${
                    showOnlyLiked ? " text-red-500" : " text-white"
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
              <div className="mt-6">
                <PushButton
                  onClick={handleAddTask}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <i className="fas fa-plus ml-2"></i>
                  افزودن تسک
                </PushButton>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
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

      <footer className="bg-dark-lighter py-4 mt-8 light:bg-light-card">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm light:text-light-text">
          <p className="animate-text">
            ساخته شده توسط{" "}
            <span className="text-primary font-semibold">mohamad majidian</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
