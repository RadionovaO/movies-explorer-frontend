import { imageURL } from "./consts";
//export const BASE_URL = 'https://api.diploma.project.nomoredomains.xyz';
export const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({name, password, email}) => {
    console.log({name, password, email});
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            name,
            password,
            email,
        })
    })
        .then((res) => checkResponse(res));
};

export const login = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
              return data;
            }
          })
};

 export const checkToken = (token) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
    })
        .then((res) => checkResponse(res));
    
};

export const signOut = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then((res) => checkResponse(res));
};

//получаем данные пользователя
export const getUserInfo = (user) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
       .then((res) => checkResponse(res));
};  

//редактирование профиля
export const updateUser = (user) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            name: user.name,
            email: user.email,
        }),
    })
       .then((res) => checkResponse(res));
};

export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
       .then((res) => checkResponse(res));
}; 

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
       .then((res) => checkResponse(res));
}; 

export const postMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${imageURL}&{data.image.url}`,
            trailerLink: movie.trailerLink.URL,
            thumbnail: `${imageURL}&{data.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        }),
    })
       .then((res) => checkResponse(res));
};  

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
       .then((res) => checkResponse(res));
}; 
