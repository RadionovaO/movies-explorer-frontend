import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { filterDuration, filterMovies } from "../../utils/filteredMovies";
import { getMovies } from "../../utils/MoviesApi";
import { useLocation } from "react-router-dom";

function Movies({ movies, saveMovies, deleteMovies, myMovies }) {
  const location = useLocation();
  const [foundedMovies, setFoundedMovies] = useState(JSON.parse(localStorage.getItem('allMovies'))); //отфильтрованные по ключевому слову
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort') || false)); //чекбокс
  const [filteredList, setFilteredList] = useState([]); //фильтр по ключу и чекбоксу

  const [notFound, setNotFound] = useState(false);

  // поиск фильма
  function handleSearchMovies(keyWord) {
    console.log(keyWord);
    localStorage.setItem('isShort', isShort);
    localStorage.setItem("keyWord", JSON.stringify(keyWord));
    if (localStorage.getItem("allMovies")) {
      const searchedMovie = JSON.parse(localStorage.getItem("allMovies"));
      console.log(searchedMovie);
      handleFilterMovies(searchedMovie, keyWord, isShort);
    } else {
      getMovies()
        .then((moviesData) => {
          handleFilterMovies(moviesData, keyWord, isShort);
          console.log(moviesData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleFilterMovies(moviesList, keyWord, short) {
    const filmList = filterMovies(moviesList, keyWord, short);
    setFoundedMovies(filmList);
    setFilteredList(short ? filterDuration(filmList) : filmList)
    localStorage.setItem("foundedFilms", JSON.stringify(filterDuration(filmList)));
    localStorage.setItem("allMovies", JSON.stringify(filmList));
  };

  function handleCheckbox() {
    setIsShort(!isShort)
   if (isShort) {
    //  if (filterDuration(foundedMovies).length === 0) {
        setFilteredList(filterDuration(foundedMovies));
      } else {
    //    setFilteredList(filterDuration(foundedMovies));
    //  }
   // } else {
      setFilteredList(foundedMovies);
    } 
    localStorage.setItem('isShort', !isShort);
  };

  useEffect(() => {
    if (localStorage.getItem('keyWord')) {
      const list = JSON.parse(localStorage.getItem('foundedFilms'))
      if (list.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setNotFound(false);
    }
  }, [foundedMovies]);

  useEffect(() => {
    if (localStorage.getItem('isShort') === 'true' ) {
      setIsShort(true);
      if (localStorage.getItem('foundedFilms')) {
        const isShort = JSON.parse(localStorage.getItem('foundedFilms'))
        setFilteredList(isShort)
      }
    } else {
      setIsShort(false);
    }
  }, [isShort, filteredList]);

/*  useEffect(() => {
    if (localStorage.getItem("foundedFilms")) {
      console.log("dk");
      const searchedMovie = JSON.parse(localStorage.getItem("foundedFilms"));
      setFoundedMovies(searchedMovie)
      if (localStorage.getItem('isShort') === 'true') {
        setFilteredList(filterDuration(searchedMovie));
      } else {
        console.log(searchedMovie);
        setFoundedMovies(searchedMovie);
      };
    }
  }, []); */

  
  useEffect(() => {
    if (localStorage.getItem("allMovies")) {
      console.log("dk");
      const searchedMovie = JSON.parse(localStorage.getItem("AllMovies"));
      setFoundedMovies(searchedMovie)
      if (localStorage.getItem('isShort') === 'true') {
        setFilteredList(filterDuration(searchedMovie));
      } else {
        console.log(searchedMovie);
        setFoundedMovies(searchedMovie);
      };
    }
  }, [filteredList]);

  return (
    <>
      <Header />
      <main>
        <SearchForm
          onSearchSubmit={handleSearchMovies}
          onChecked={handleCheckbox}
          isShort={isShort} />
        <MoviesCardList
          movies={filteredList}
          filteredList={filteredList}
          saveMovies={saveMovies}
          deleteMovies={deleteMovies}
          myMovies={myMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
