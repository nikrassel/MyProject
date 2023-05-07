import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import { validator } from "../../utils/validator"
import { login } from "../../store/user"
import { useDispatch } from "react-redux"

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    }
    function handleChange({ name, newValue }) {
        setData((prevState) => ({
            ...prevState,
            [name]: newValue
        }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log(data)
        const isValid = validate()
        if (!isValid) return
        dispatch(login(data))
        navigate("/")
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const buttonActive = Object.keys(errors).length === 0
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            ></TextField>
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            ></TextField>
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                disabled={!buttonActive}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
