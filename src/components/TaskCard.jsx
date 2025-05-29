import React from "react";

const TaskCard = ({
  title,
  description,
  onLike,
  isLiked,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="glass-card text-white max-w-md mx-auto rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-in-out animate-fade-in p-8">
      <div className="flex items-center gap-2">
        <i className="fas fa-check-circle text-primary text-xl"></i>
        <div className="uppercase tracking-wide text-sm text-primary font-semibold">
          {title}
        </div>
      </div>
      <p className="text-lg font-medium mt-2">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            className="group p-2 rounded-lg bg-gradient-to-b from-red-500 to-red-600 shadow hover:shadow-lg active:scale-95 transition-all duration-200"
            title="حذف"
          >
            <i className="fas fa-trash-alt text-white group-hover:text-red-100"></i>
          </button>
          <button
            onClick={onEdit}
            className="group p-2 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 shadow hover:shadow-lg active:scale-95 transition-all duration-200"
            title="ویرایش"
          >
            <i className="fas fa-edit text-white group-hover:text-blue-100"></i>
          </button>
          <button
            onClick={onLike}
            className={`group p-2 rounded-lg bg-gradient-to-b from-gray-400 to-gray-600 shadow hover:shadow-lg active:scale-95 transition-all duration-200 ${
              isLiked ? "ring-2 ring-blue-400" : ""
            }`}
            title="علاقه‌مندی"
          >
            <i
              className={`fas fa-heart ${
                isLiked ? "text-blue-400" : "text-white/70"
              } group-hover:text-blue-300`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
