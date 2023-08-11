import React from "react";
import { Link } from "react-router-dom";
import './Portfolio.css';

function Portfolio() {

    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__element">
                    <Link to='https://github.com/RadionovaO/how-to-learn' className="portfolio__link">Статичный сайт</Link>
                    <button className="portfolio__button">↗</button>
                </li>
                <li className="portfolio__element">
                    <Link to='https://github.com/RadionovaO/russian-travel' className="portfolio__link">Адаптивный сайт</Link>
                    <button className="portfolio__button">↗</button>
                </li>
                <li className="portfolio__element">
                    <Link to='https://github.com/RadionovaO/react-mesto-api-full-gha' className="portfolio__link">Одностраничное приложение</Link>
                    <button className="portfolio__button">↗</button>
                </li>
            </ul>
        </div>
    );
};

export default Portfolio;