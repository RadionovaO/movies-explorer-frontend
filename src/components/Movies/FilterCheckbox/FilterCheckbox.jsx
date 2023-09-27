import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ onChecked, isShort }) {

    return (
        <div className="checkbox">
            <input
                className="checkbox__input"
                type="checkbox"
                onChange={onChecked}
                checked={isShort}
            ></input>
            <p className="checkbox__title">Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;