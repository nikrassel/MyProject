import React, { useState } from "react"
import PropTypes from "prop-types"
import { arrayOfGoods } from "../../utils/temporaryDataBase"
import { useNavigate } from "react-router-dom"
import FiltersAppendix from "./filtersAppendix"

const CategoryLayout = ({ currentCategory }) => {
    const navigate = useNavigate()
    const [maxPrice, setMaxPrice] = useState(200)
    function handleChange(value) {
        setMaxPrice(value)
    }
    const currentLayout = arrayOfGoods.filter(
        (elem) => elem.category === currentCategory
    )
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${currentCategory}/${endPoint}`)
    }
    const filtredLayout = currentLayout.filter((elem) => elem.price <= maxPrice)
    return (
        <>
            <FiltersAppendix value={Number(maxPrice)} onChange={handleChange} />
            <div className="row row-cols-1 row-cols-md-3 mb-3 mt-3">
                {filtredLayout.map((item) => (
                    <div className="col" key={item.id}>
                        <div className="card mb-4" style={{ width: "18rem" }}>
                            <img src={item.img} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a
                                        id={item.id}
                                        href=""
                                        onClick={handleClick}
                                    >
                                        {item.name}
                                    </a>
                                </h5>
                                <h4 className="card-title">{item.price} Р</h4>
                                <p className="card-text">
                                    {item.shortDescription}
                                </p>
                                <a href="" className="btn btn-warning">
                                    Купить
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

CategoryLayout.propTypes = {
    currentCategory: PropTypes.string
}

export default CategoryLayout
