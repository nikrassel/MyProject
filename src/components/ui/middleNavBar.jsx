import React from "react"
import { logo } from "../utils/temporaryDataBase"
import { useNavigate } from "react-router-dom"

const MiddleNavBar = () => {
    const navigate = useNavigate()
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/${endPoint}`)
    }
    return (
        <nav className="navbar navbar-light bg-light m-5">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="" width="200px" />
                </a>
                <div>
                    <form className="d-flex">
                        <input
                            className="form-control-lg"
                            type="search"
                            placeholder="Поиск"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <a className="navbar-brand" href="#">
                    <i className="bi bi-box2-heart"></i>
                    Мои заказы
                </a>
                <a
                    className="navbar-brand"
                    href=""
                    id="basket"
                    onClick={handleClick}
                >
                    <i className="bi bi-basket2"></i>
                    Корзина
                </a>
            </div>
        </nav>
    )
}

export default MiddleNavBar
