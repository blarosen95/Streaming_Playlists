import React from "react";

const SeasonButton = ({label, onButtonClick}) => (
    <div className="season-button">
        <div className="season-span-wrapper">
            <span className="season-span btn-5" onClick={onButtonClick} id={"season-" + label}>&nbsp;&nbsp;{label}</span>
        </div>
    </div>
);

export default SeasonButton;