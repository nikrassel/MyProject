import React from "react"
import PropTypes from "prop-types"
const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}) => {
    function handleChange({ target }) {
        onChange({ name: target.name, value: target.value })
    }
    function getInputClasses() {
        return "form-select" + (error ? " is-invalid" : "")
    }
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  _id: options[optionName]._id
              }))
            : options
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option
                            value={option._id}
                            key={option.name + "_" + option._id}
                        >
                            {option.name}
                        </option>
                    ))}
                <option value="_id">...</option>
            </select>
            <div className="invalid-feedback">Please select a valid state.</div>
        </div>
    )
}

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
}
export default SelectField
