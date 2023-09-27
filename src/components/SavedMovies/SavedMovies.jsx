import React, {useState} from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({ onSearchSubmit, deleteMovies, myMovies }) {
    
    const [movies, setMovies] = useState([]);

    return (
        <div className="saved-movies">
            <Header />
            <main>
            <SearchForm
                onSearchSubmit={onSearchSubmit}/>
                <MoviesCardList
                    movies={movies}
                    deleteMovies={deleteMovies}
                    myMovies={myMovies}
                />
            </main>
            <Footer />
       </div>
    );
};

export default SavedMovies;