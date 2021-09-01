import React from "react";

const SeasonButton = ({label, onButtonClick}) => (
    <div className="season-button">
        <span className="season-button btn-5" onClick={onButtonClick} id={"season-"+label}>{label}</span>
    </div>
);

export default SeasonButton;