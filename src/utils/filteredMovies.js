import { SHORT } from "./consts";

export function filterDuration(movies) {
    return movies?.filter((movie) => movie.duration <= SHORT);
}

export function filterMovies(movies, keyWord) {
    const searchedMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyWord.toString().toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(keyWord.toString().toLowerCase())
        ;
    });
    return searchedMovies;
};