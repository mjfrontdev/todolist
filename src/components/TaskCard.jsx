import React from "react";

const TaskCard = ({ title, description, onLike, isLiked }) => {
  return (
    <div className="task-card text-white max-w-md mx-auto rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-in-out animate-fade-in">
      <div className="p-8">
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
              onClick={onLike}
              className="group p-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.95] transition-all duration-200"
            >
              <i
                className={`fas ${
                  isLiked ? "fa-heart text-red-500" : "fa-heart text-gray-400"
                } hover:text-red-500`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
