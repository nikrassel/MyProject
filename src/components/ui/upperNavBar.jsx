import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIsLoggedIn, logOut } from "../../store/user"

const UpperNavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleLogOut() {
        dispatch(logOut())
        navigate("/")
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <ul type="none" className="nav nav-pills nav-fill">
                    <button type="button" className="btn btn-warning">
                        <Link to="/">Main</Link>
                    </button>
                </ul>
                {isLoggedIn
                    ? (
                        <div className="d-flex">
                            <button type="button" className="btn btn-warning">
                                <Link to="/cabinet">Your cabinet</Link>
                            </button>
                            <button type="button" className="btn btn-warning" onClick={handleLogOut}>
                                Logout
                            </button>
                        </div>
                    )
                    : (
                        <div className="d-flex">
                            <button type="button" className="btn btn-warning">
                                <Link to="/login">Login</Link>
                            </button>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}

export default UpperNavBar
