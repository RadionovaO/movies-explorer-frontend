import React, { useContext, useEffect, useState } from "react";
import './Profile.css';
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Profile({onUpdateUser, onSignOut}) {

    const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser)

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [currentUser, setValues]);

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({
            name: values.name,
            email: values.email,
        })
    };


    return (
        <div className="profile">
            <Header />
            <div className="profile__container">
            <h2 className="profile__title">Привет, {currentUser.name}</h2>
            <form className="profile__form" onSubmit={handleSubmit} noValidate>
                <label className="profile__label" htmlFor="name">Имя
                    <input className="profile__input"
                        name="name"
                        type="text"
                        placeholder="Ведите имя"
                        value={values.name ?? ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="profile__label">E-mail
                        <input className="profile__input"
                        name="email"
                        type="text"
                        placeholder="Ведите E-mail"
                        value={values.email ?? ''}
                        onChange={handleChange}
                        required   
                    />
                </label>
                </form>
                <button
                    className="profile__edit-button"
                    type="submit"
                    onClick={handleSubmit}
                >Редактировать</button>
                <Link
                    className="profile__link-signout"
                    to='/'
                    onClick={onSignOut}
                >Выйти из аккаунта</Link>
            </div>
        </div>
    );
};

export default Profile;