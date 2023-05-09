import React from "react"
import { useNavigate } from "react-router-dom"
import { mainCategories } from "../../utils/temporaryDataBase"
import { getIsLoggedIn } from "../../store/user"
import { useSelector } from "react-redux"

const LowerNavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const navigate = useNavigate()
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${endPoint}`)
    }
    function handleToPersonal(target) {
        const endPoint = target.target.id
        navigate(`/${endPoint}`)
    }
    return (
        <>
            <nav className="navbar navbar-light bg-primary">
                <div className="container">
                    <div className="dropdown">
                        <button
                            className="btn btn-warning dropdown-toggle"
                            type="button"
                            id="catalogDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Каталог
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="catalogDropdown"
                        >
                            {mainCategories.map((item) => (
                                <li key={item}>
                                    <a
                                        className="dropdown-item"
                                        id={item}
                                        href=""
                                        onClick={handleClick}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="button" className="btn btn-warning">
                        Товары месяца
                    </button>
                    <button type="button" className="btn btn-warning">
                        Большие скидки
                    </button>
                    {isLoggedIn ? (
                        <button
                            type="button"
                            className="btn btn-warning"
                            id="cabinet"
                            onClick={handleToPersonal}
                        >
                            Ваш Кабинет
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-warning"
                            id="login"
                            onClick={handleToPersonal}
                        >
                            Войти
                        </button>
                    )}
                </div>
            </nav>
        </>
    )
}

export default LowerNavBar
