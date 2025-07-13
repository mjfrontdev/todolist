import React from "react";

const AddTaskButton = ({ onClick, children }) => (
  <button
    className="btn flex items-center gap-2 px-6 py-2"
    onClick={onClick}
    type="button"
  >
    <span className="text-base font-bold text-inherit">
      {children}
    </span>
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default AddTaskButton;
