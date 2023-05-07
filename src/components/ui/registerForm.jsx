import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import { validator } from "../../utils/validator"
import { signUp } from "../../store/user"
import { useDispatch } from "react-redux"

// Добавить валидацию для данных
const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        licence: false
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        name: {
            isRequired: {
                message: "Имя обязателено для заполнения"
            },
            min: {
                message: "Имя должно содержать минимум три символа",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен содержать минимум восемь символов",
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете пользоваться нашим сервисом без подтверждения соглашения"
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
        dispatch(signUp(data))
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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
                name="licence"
                error={errors.licence}
            >
                Подтвердить
                <a>Лицензионное соглашение</a>
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

export default RegisterForm
