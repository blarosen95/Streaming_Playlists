import React from "react";

const Checkbox = ({label, onBoxChange}) => (
    <div className="form-check">
        <input
            type="checkbox"
            name={label}
            onChange={onBoxChange}
            className="form-check-input episode-check"
        />
        <label className="form-check-label episode-label">
            {label}
        </label>
    </div>
);

export default Checkbox;