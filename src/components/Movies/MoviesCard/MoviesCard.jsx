import React, { useState } from "react";
import './MoviesCard.css';
import { useLocation } from "react-router-dom";
import { MOVIES_URL } from "../../../utils/MoviesApi";
import { durationHour, durationMin } from "../../../utils/durationMovies";
import { deleteMovie } from "../../../utils/MainApi";
// import cardImage from '../../../images/card.png'

function MoviesCard({ movie, saveMovies, deleteMovies, myMovies }) {
    const location = useLocation();
    const [isSave, setIsSave] = useState(false);

    function onClickMovie() {
        if (!isSave) {
            saveMovies(movie)
        } else {
            const someMovie = myMovies.find((item) => item.movieId === movie.id);
            deleteMovies(someMovie)
            setIsSave(false)
        };
    };

    function onDeleteMovie() {
        deleteMovies(movie)
    }
    
    return (
        <li className="card">
            
            <div className="card__description">
                <h2 className="card__name" >{movie.nameRU}</h2>
                <p className="card__duration">{`${durationHour(movie.duration)} ${durationMin(movie.duration)}`}</p>
            </div>
            <a href={movie.trailerLink} target="blank" className="card__link">
            <img
                className="card__image"
                src={location.pathname === '/movies'
                    ? 'https://api.nomoreparties.co/' + movie.image.url
                    : movie.image
                }
                    alt={movie.nameRU} />
            </a>
            {
            location.pathname === '/saved-movies'
                    ? <button className="card__delete" type="button" onClick={onDeleteMovie}></button>
                    : isSave
            ? <span className="card__save-active"></span>
            :  <button className="card__save" type="button" onClick={onClickMovie}>Сохранить</button>
            } 
        </li>
    );
};


export default MoviesCard;