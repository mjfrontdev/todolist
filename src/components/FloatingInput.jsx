import React from "react";

const FloatingInput = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  icon,
}) => {
  return (
    <div className="input-group relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="input"
      />
      <i className={`input-icon ${icon}`}></i>
      <label className="user-label">{label}</label>
    </div>
  );
};

export default FloatingInput;
