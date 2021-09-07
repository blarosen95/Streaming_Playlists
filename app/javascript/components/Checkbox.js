import React from "react";

const Checkbox = ({label, onBoxChange, isSelected, number}) => (
    <div className="form-check">
        <input
            type="checkbox"
            // name={label}
            name={number}
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