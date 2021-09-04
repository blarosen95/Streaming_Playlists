import React from "react";

const Checkbox = ({label, onBoxChange}) => (
    <div className="form-check">
        <label className="episode-label">
            {label}
        </label>
        <input
            type="checkbox"
            name={label}
            onChange={onBoxChange}
            className="form-check-input episode-check"
        />
        {/*</label>*/}
    </div>
);

export default Checkbox;