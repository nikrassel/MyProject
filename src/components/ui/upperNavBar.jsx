import React from "react"
import { Link } from "react-router-dom"

const UpperNavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <ul type="none" className="nav nav-pills nav-fill">
                    <button type="button" className="btn btn-warning">
                        <Link to="/">Main</Link>
                    </button>
                </ul>
                <div className="d-flex">
                    <button type="button" className="btn btn-warning">
                        <Link to="/cabinet">Your cabinet</Link>
                    </button>
                </div>
                <div className="d-flex">
                    <button type="button" className="btn btn-warning">
                        <Link to="/login">Login</Link>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default UpperNavBar
