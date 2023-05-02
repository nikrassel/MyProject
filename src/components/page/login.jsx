import React, { useState } from "react"
import { useParams } from "react-router-dom"
import LoginForm from "../ui/loginForm"
import RegisterForm from "../ui/registerForm"

const Login = () => {
    const { type } = useParams()
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    )
    function toggleFormType() {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        )
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>Уже есть аккаунт?</p>
                            <a role="button" onClick={toggleFormType}>
                                Sign In
                            </a>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>Еще нет аккаунта?</p>
                            <a role="button" onClick={toggleFormType}>
                                Sign Up
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login
