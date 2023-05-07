import React, { useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import FiltersAppendix from "./filtersAppendix"
import { useSelector, useDispatch } from "react-redux"
import { getGoodsByCategory } from "../../../store/goods"
import { updateBasket } from "../../../store/basket"
import { goodCheck } from "../../../utils/goodInBasket"

const CategoryLayout = ({ currentCategory, userBasket }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [maxPrice, setMaxPrice] = useState(200)
    const [basket, setBasket] = useState({
        ...userBasket
    })
    function handleChange(value) {
        setMaxPrice(value)
    }
    const currentLayout = useSelector(getGoodsByCategory(currentCategory))
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${currentCategory}/${endPoint}`)
    }
    function handleBuy(target) {
        const id = target.target.id
        const newGood = goodCheck(id, basket)
        const goods = {
            ...basket.goods,
            ...newGood
        }
        const temp = {
            ...basket,
            goods
        }
        setBasket(temp)
        dispatch(updateBasket({
            ...temp
        }))
    }
    function handleIncrement(target) {
        const id = target.target.id
        const temp = { ...basket.goods[id] }
        temp.goodQuantity += 1
        const tempBasket = {
            ...basket,
            goods: {
                ...basket.goods,
                [id]: temp
            }
        }
        setBasket(tempBasket)
        dispatch(updateBasket({
            ...tempBasket
        }))
    }
    function handleDecrement(target) {
        const id = target.target.id
        let tempBasket = {}
        if (basket.goods[id].goodQuantity > 1) {
            const temp = { ...basket.goods[id] }
            temp.goodQuantity -= 1
            tempBasket = {
                ...basket,
                goods: {
                    ...basket.goods,
                    [id]: temp
                }
            }
        } else {
            const temp = { ...basket.goods }
            delete temp[id]
            tempBasket = {
                ...basket,
                goods: temp
            }
        }
        setBasket(tempBasket)
        dispatch(updateBasket({
            ...tempBasket
        }))
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
                                {basket.goods && Object.keys(basket.goods).includes(item.id)
                                    ? (
                                        <div>
                                            <button id={item.id} className="btn btn-warning" onClick={handleDecrement}>
                                                -
                                            </button>
                                            <span className="badge bg-warning text-dark p-3 m-2">{basket.goods[item.id].goodQuantity}</span>
                                            <button id={item.id} className="btn btn-warning" onClick={handleIncrement}>
                                                +
                                            </button>
                                        </div>
                                    )
                                    : (
                                        <button id={item.id} className="btn btn-warning" onClick={handleBuy}>
                                            Купить
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

CategoryLayout.propTypes = {
    currentCategory: PropTypes.string,
    userBasket: PropTypes.object
}

export default CategoryLayout
