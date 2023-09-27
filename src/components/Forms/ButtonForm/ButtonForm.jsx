import React from "react";
import { Link, useLocation } from "react-router-dom";
import './ButtonForm.css';
// import { useFormAndValidation } from "../../../hooks/useFormAndValidation";

function ButtonForm({isValid, handleSubmit}) {
    const location = useLocation();

    // const { values, handleChange, errors, isValid, setValues } = useFormAndValidation()

    return (
        <div className="button-form" >
            <button
                className="button-form__submit"
                type="submit"
                disabled={!isValid}>
                {location.pathname === '/signup' ? 'Зарегистрироваться' : 'Войти'}
            </button>
            <div className="button-form__link-container">
                <span className="button-form__span">
                    {location.pathname === '/signup' ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?' }
                </span>
                <Link className="button-form__link" to={location.pathname === '/signup' ? '/signin' : '/signup'}>
                {location.pathname === '/signup' ? 'Войти' : 'Регистрация'}
                </Link>
            </div>
        </div>
    );
};

export default ButtonForm;