import React, { useState } from "react"
import PropTypes from "prop-types"

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeHolder
}) => {
    const [showPassword, setShowPassword] = useState(false)
    function handleChange({ target }) {
        onChange({ name: target.name, newValue: target.value })
    }
    function getInputClasses() {
        return "form-control" + (error ? " is-invalid" : "")
    }
    function toggleShowPassword() {
        setShowPassword((prevState) => !prevState)
    }
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    className={getInputClasses()}
                    placeholder={placeHolder}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}
TextField.defaultProps = {
    type: "text",
    placeHolder: ""
}
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeHolder: PropTypes.string
}

export default TextField
