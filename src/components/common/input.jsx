import React from "react";

// Watch video #129 to watch how he did destructing for this
// if we need many values then we can use the rest/spread operator
// here not done
const Input = ({ type, name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        type={type}
        className="form-control"
      />
      {/* video #121 (below) */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
