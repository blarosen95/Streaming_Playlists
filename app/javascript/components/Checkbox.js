import React from "react";

const Checkbox = ({label, onBoxChange, isSelected}) => (
    <div className="form-check">
        <input
            type="checkbox"
            name={label}
            onChange={onBoxChange}
            className="form-check-input episode-check"
            checked={isSelected}
        />
        <label className="form-check-label episode-label">
            {label}
        </label>
    </div>
);

export default Checkbox;