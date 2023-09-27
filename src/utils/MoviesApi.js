export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = () => {
    return fetch(`${MOVIES_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
       // credentials: 'include',
    })
        .then((res) => checkResponse(res));
};  