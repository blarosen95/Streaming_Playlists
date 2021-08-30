import React from "react";

const Checkbox = ({ label, isChecked, onBoxChange }) => (
    <div className="form-check">
        <label>
            <input
                type="checkbox"
                name={label}
                checked={isChecked}
                onChange={onBoxChange}
                className="form-check-input"
            />
            {label}
        </label>
    </div>
);

export default Checkbox;