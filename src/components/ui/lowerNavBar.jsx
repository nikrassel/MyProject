import React from "react"
import { useNavigate } from "react-router-dom"
import { mainCategories } from "../../utils/temporaryDataBase"

const LowerNavBar = () => {
    const navigate = useNavigate()
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${endPoint}`)
    }
    return (
        <>
            <nav className="navbar navbar-light bg-primary">
                <div className="container">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
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
                    <a className="navbar-brand" href="#">
                        Товары месяца
                    </a>
                    <a className="navbar-brand" href="#">
                        Большие скидки
                    </a>
                    <a className="navbar-brand" href="#">
                        Предзаказы
                    </a>
                </div>
            </nav>
        </>
    )
}

export default LowerNavBar
