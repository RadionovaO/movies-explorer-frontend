import React from "react";
import './Register.css';
import HeaderForm from "../Forms/HeaderForm/HeaderForm";
import ButtonForm from "../Forms/ButtonForm/ButtonForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Register({onRegister}) {

    const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();
    
    function handleSubmit(evt) {
        evt.preventDefault();
        /*if (isValid) {
            console.log(isValid);
            onRegister(values.name, values.password, values.email);
        };*/
        onRegister({
            name: values.name,
            password: values.password,
            email: values.email,
        });
    };

    return (
        <div className="register">
            <HeaderForm />
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__label">Имя</label>
                <input
                    className={`register__input ${!isValid && 'register__input_type_error'}`}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Введите имя"
                    value={values.name ?? ''}
                    required
                    onChange={handleChange}
                /> 
                <span className="register__input-error">{ errors.name ?? '' }</span>
                
                <label className="register__label">E-mail</label>
                <input
                    className={`register__input ${!isValid && 'register__input_type_error'}`}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Введите email"
                    value={values.email ?? ''}
                    required
                    onChange={handleChange}
                />
                <span className="register__input-error">{ errors.email ?? '' }</span>
                
                <label className="register__label">Пароль</label>
                <input
                    className={`register__input ${!isValid && 'register__input_type_error'}`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Введите пароль"
                    minLength='6'
                    value={values.password ?? ''}
                    required
                    onChange={handleChange}
                />
                <span className="register__input-error">{ errors.password ?? '' }</span>

            </form>
            <ButtonForm isValid={isValid}/>
        </div>
    );
};

export default Register;