import React, { useEffect, useState } from "react";
import './SearchForm.css';
import SearchImage from '../../../images/icon-search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm() {

    return (
        <section className="search-form">
            <form className="search-form__block">
                <img className="search-form__image" alt="Поиск" src={SearchImage}></img>
                <input
                    className="search-form__input"
                    placeholder="Фильм"
                    type="text"
                ></input>
                <button className="search-form__button" type="button"></button>
            </form>
            <FilterCheckbox />
        </section>
    );
};

export default SearchForm;