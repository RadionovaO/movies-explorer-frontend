import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ErrorPage from "../ErrorPage/ErrorPage";
import PopupInfo from "../PopupInfo/PopupInfo";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { filterDuration, filterMovies } from "../../utils/filteredMovies";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [saveMovie, setSaveMovie] = useState([]);

  const [notFound, setNotFound] = useState(false);

 /* const [isWord, setIsWord] = useState('');
  const [resultList, setResultList] = useState([]);
  const [foundedMovies, setFoundedMovies] = useState([]);*/

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isTooltipImage, setIsTooltipImage] = useState('');
  const [isTooltipTitle, setIsTooltipTitle] = useState('');

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function openPopupInfo() {
    setIsInfoTooltipOpen(true);
    setIsTooltipImage('Ok');
    setIsTooltipTitle('Успешно');
  };

  function errorPopupInfo() {
    setIsInfoTooltipOpen(true);
    setIsTooltipImage('Error');
    setIsTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
  };
  
  function closePopup() {
    setIsInfoTooltipOpen(false);
  }

  // регистрация
  function handleRegistration({ name, password, email }) {
    console.log({ name, password, email });
    // setIsLoading(true);
    MainApi.register({ name, password, email })
      .then(() => {
        handleLoginSubmit({ email, password });
        navigate("/signin", { replace: true });
        openPopupInfo()
        
      })
      .catch((err) => {
        console.log(err);
        errorPopupInfo();
      });
    /* .finally(() => {
        setIsLoading(false);
      }); */
  }

  // логин
  function handleLoginSubmit({ email, password }) {
    setIsLoading(true);
    if (!email || !password) {
      return;
    }
    MainApi.login({ email, password })
      .then((res) => {
        if (res.token) {
          // setEmail(res.email);
          setLoggedIn(true);
          setValues({ email: "", password: "" });
          navigate("/movies", { replace: true });
          // handleLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        errorPopupInfo();
      });
    /* .finally(() => {
            setIsLoading(false);
        });*/
  }

  /*function handleLogin() {
    setLoggedIn(true);
  };*/

  // проверка токена
  function tokenCheck() {
    // const jwt = localStorage.getItem('jwt');
    // if (jwt) {
    MainApi.checkToken()
      .then((res) => {
        if (res) {
          // setEmail(res.email);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // };
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  // выход
  function onSignOut() {
    MainApi.signOut()
        .then(() => {
            setLoggedIn(false);
            navigate('/signin', { replace: false });
        })
        .catch((err) => {
            console.log(err);
        });
  };
  
  useEffect(() => {
    if (loggedIn === true) {
        Promise.all([MainApi.getUserInfo()], [getMovies()])
            .then(([user, moviesList]) => {
              setCurrentUser(user);
             // setFoundedMovies(moviesList)
            })
            .catch((err) => {
                console.log(err)
            });
    };
  }, [loggedIn]);

  // редактирование профиля
  function handleUpdateUser(user) {
    MainApi.updateUser(user) 
      .then((res) => {
        setCurrentUser(res)
        openPopupInfo();
      })
      .catch((err) => {
        console.log(err);
        errorPopupInfo();
    })
  };

  function handleLikeMovie() {
    MainApi
      .postMovie()
      .then((newMovie) => {
        setSaveMovie([newMovie, ...saveMovie]);
      })
      .catch((err) => {
        console.log(err)
    });
  };

  function handleDeleteMovie(movie) {
    MainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSaveMovie((state) => state.filter((i) => i._id !== movie._id));
      })
      .catch((err) => {
        console.log(err)
    });
  }

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <Routes>
            <Route
              path="/signup"
              element={<Register onRegister={handleRegistration} />}
            />
            <Route
              path="/signin"
              element={<Login onLoginSubmit={handleLoginSubmit} />}
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={<Movies
                saveMovies={handleLikeMovie}
                deleteMovies={handleDeleteMovie}
              />}
            
            />
            <Route
              path="/saved-movies"
              element={<SavedMovies
              deleteMovies={handleDeleteMovie}
              />} />

            <Route
              path="/profile"
              element={<Profile
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={onSignOut} />}
            />
            <Route path="/404" element={<ErrorPage />} />
          </Routes>
      

          <PopupInfo
            isOpen={isInfoTooltipOpen}
            onClose={closePopup}
            tooltipImage={isTooltipImage}
            title={isTooltipTitle}
          />
        </div>
      </CurrentUserContext.Provider>
    );
};

export default App;
