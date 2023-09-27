import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { SHOW_CARDS_1, SHOW_CARDS_2, SHOW_CARDS_3 } from "../../../utils/consts";

function MoviesCardList({saveMovies, deleteMovies, myMovies}) {
  //  const [movies, setMovies] = useState([]);
  // const [allMovies, setAllMovies] = useState(0);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [showCards, setShowCards] = useState(0);
  const display = window.innerWidth;

  function showMore() {
    if (display > 1200) {
      setShowCards(showCards + SHOW_CARDS_3);
    } else if (display > 790) {
      setShowCards(showCards + SHOW_CARDS_2);
    } else if (display < 790) {
      setShowCards(showCards + SHOW_CARDS_1);
    };
  };

  function showMovies() {
    if (display > 1200) {
      setShowCards(16)
    } else if (display > 790) {
      setShowCards(12)
    } else if (display > 766) {
      setShowCards(8)
    } else if (display < 766) {
      setShowCards(5);
    };
  };

  useEffect(() => {
    showMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', showMovies);
    }, 500);
  });

  return (
    <section className="movies">
      <>
        <ul className="movies__list">
          {movies.length ? (
            movies.slice(0, showCards).map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                  saveMovies={saveMovies}
                  deleteMovies={deleteMovies}
                  myMovies={myMovies}
                />
            ))
          ) : (
            <p className="movies__error"></p>
          )}
        </ul>
        {movies.length > showCards ? (
        <button className="movies__more-button" type="button"
        onClick={showMore}>
          Ещё
          </button>
        ) : (
            ''
          )}
      </>
    </section>
  );
}

export default MoviesCardList;
