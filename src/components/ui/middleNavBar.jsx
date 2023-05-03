import React, { useState } from "react"
import { logo } from "../utils/temporaryDataBase"
import { useNavigate } from "react-router-dom"

const MiddleNavBar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/${endPoint}`)
    }
    function handleReturnOnMain() {
        navigate("/")
    }
    function handleChange(target) {
        setSearch(target.target.value)
    }
    function handleSearch() {
        if (search) {
            navigate(`/search/${search}`)
        }
    }
    return (
        <nav className="navbar navbar-light bg-light m-5">
            <div className="container">
                <a className="navbar-brand" href="">
                    <img
                        src={logo}
                        alt=""
                        width="200px"
                        onClick={handleReturnOnMain}
                    />
                </a>
                <div>
                    <form className="d-flex">
                        <input
                            className="form-control-lg"
                            type="search"
                            placeholder="Поиск"
                            aria-label="Search"
                            value={search}
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-outline-success"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>
                </div>
                <a
                    className="navbar-brand"
                    href=""
                    id="orders"
                    onClick={handleClick}
                >
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
