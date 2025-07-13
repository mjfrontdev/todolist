import React from "react";

const PushButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`btn px-6 py-2 ${className}`}
      type="button"
    >
      <span className="flex gap-2 items-center">{children}</span>
    </button>
  );
};

export default PushButton;
