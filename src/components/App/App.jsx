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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);


  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleRegistration({ name, password, email }) {
    console.log({ name, password, email })
   // setIsLoading(true);
    MainApi.register({name, password, email})
      .then(() => {
        handleLoginSubmit({email, password})
        // navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
     /* .finally(() => {
        setIsLoading(false);
      }); */
  }

  function handleLoginSubmit({email, password}) {
    setIsLoading(true);
    if (!email || !password) {
        return
    }
    MainApi.login({email, password})
    .then((res) => {
        if (res.token) {
           // setEmail(res.email);
          setLoggedIn(true);
            setValues({ email: '', password: '' });
            navigate('/movies', { replace: true });
           // handleLogin();
        };
    })
        .catch((err) => {
            console.log(err);
           // errorInfoTooltip();
        })
       /* .finally(() => {
            setIsLoading(false);
        });*/
};

/*function handleLogin() {
    setLoggedIn(true);
};*/

function tokenCheck() {
     // const jwt = localStorage.getItem('jwt');
      // if (jwt) {
        MainApi.checkToken()
            .then((res) => {
                if (res) {
                   // setEmail(res.email);
                    setLoggedIn(true);
                    navigate('/movies', { replace: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });
     // };
};

useEffect(() => {
    tokenCheck();
}, []);

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
            element={<Login onLoginSubmit={handleLoginSubmit}/>}
          />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/404" element={<ErrorPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
