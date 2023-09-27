import React from "react";
import './Login.css';
import HeaderForm from "../Forms/HeaderForm/HeaderForm";
import ButtonForm from "../Forms/ButtonForm/ButtonForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login({onLoginSubmit}) {

    const { values, handleChange, errors, isValid, setValues } = useFormAndValidation()
    
    function handleSubmit(evt) {
        evt.preventDefault();
        /*if (isValid) {
            onLoginSubmit(values.password, values.email);
        };*/
        onLoginSubmit({
            password: values.password,
            email: values.email,
        });
    };

    return (
        <div className="login">
            <HeaderForm />
            <form className="login__form" onSubmit={handleSubmit}>

                <label className="login__label">E-mail</label>
                <input
                    className={`login__input ${!isValid && 'login__input_type_error'}`}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Введите email"
                    value={values.email ?? ''}
                    
                    onChange={handleChange}
                />
                <span className="login__input-error">{ errors.email ?? '' }</span>
                
                <label className="login__label">Пароль</label>
                <input
                    className={`login__input ${!isValid && 'login__input_type_error'}`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Введите пароль"
                    minLength='6'
                    value={values.password ?? ''}
                    required
                    onChange={handleChange}
                />
                <span className="login__input-error">{ errors.password ?? '' }</span>
            <ButtonForm isValid={isValid}/>    
            </form>
            
        </div>
    );
};

export default Login;