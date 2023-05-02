import React from "react"
import PropTypes from "prop-types"

const FiltersAppendix = ({ value, onChange }) => {
    function handleChange(target) {
        onChange(target.target.value)
    }
    return (
        <>
            <button
                className="btn btn-primary mt-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
            >
                Фильтры
            </button>

            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        Категория
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <p>Подкатегория</p>
                        <p>Подкатегория</p>
                        <p>Подкатегория</p>
                        <label htmlFor="customRange1" className="form-label">
                            Цена до
                        </label>
                        <input
                            type={"number"}
                            value={value}
                            onChange={handleChange}
                            className={"form-control"}
                        />
                        <input
                            type="range"
                            className="form-range"
                            id="customRange1"
                            min="0"
                            max="200"
                            step="1"
                            value={value}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
            </div>
        </>
    )
}

FiltersAppendix.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
}

export default FiltersAppendix
