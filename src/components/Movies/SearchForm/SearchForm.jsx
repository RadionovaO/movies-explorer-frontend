import React, { useEffect, useState } from "react";
import './SearchForm.css';
import SearchImage from '../../../images/icon-search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
// import { useFormAndValidation } from "../../../hooks/useFormAndValidation";


function SearchForm({ onSearchSubmit, onChecked, isShort }) {
    
    const location = useLocation();
    const [keyWord, setKeyWord] = useState('');
    const [value, setValue] = useState('');
   // const [foundFilms, setFoundFilms] = ([]);


    function handleSubmit(evt) {
        evt.preventDefault();
       // const { keyWord } = values;
        console.log(keyWord);
        onSearchSubmit(keyWord);
    };

    function handleChangeForm(evt) {
        setKeyWord(evt.target.value);
    };

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('foundedFilm')) {
            const foundKey = localStorage.getItem('foundedFilm');
            setKeyWord(foundKey);
        }
    }, [location]) 

    return (
        <section className="search-form">
            <form className="search-form__block" onSubmit={handleSubmit}>
                <img className="search-form__image" alt="Поиск" src={SearchImage}></img>
                <input
                    className="search-form__input"
                    placeholder="Фильм"
                    type="text"
                    name="keyWord"
                    onChange={handleChangeForm}
                    value={ value.keyWord }
                    required
                ></input>
                
                <button className="search-form__button" type="submit"></button>
                
            </form>
            <span className="search-form__error">{}</span>
            <FilterCheckbox
                onChecked={onChecked}
                isShort={isShort}
            />
            
        </section>
    );
};

export default SearchForm;