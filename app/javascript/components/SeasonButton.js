import React from "react";

const SeasonButton = ({label, onButtonClick}) => (
    <div className="season-button season-span btn-5">
        <span className="season-span btn-5" onClick={onButtonClick} id={"season-"+label}>{label}</span>
    </div>
);

export default SeasonButton;