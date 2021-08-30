import React from "react";

const Checkbox = ({ label, onBoxChange }) => (
    <div className="form-check">
        <label>
            <input
                type="checkbox"
                name={label}
                onChange={onBoxChange}
                className="form-check-input"
            />
            {label}
        </label>
    </div>
);

export default Checkbox;