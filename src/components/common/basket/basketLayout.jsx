import React, { useEffect, useState } from "react"
import CheckBoxField from "../form/checkBoxField"
import {
    getGoodImage,
    getGoodName,
    getGoodPrice
} from "../../../utils/goodInBasket"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { updateBasket } from "../../../store/basket"
import { updateFavorites } from "../../../store/favorites"

const BasketLayout = ({ userBasket, arrayOfGoods, userFavorites }) => {
    const [currentBasket, setCurrentBasket] = useState({
        ...userBasket
    })
    const [favorites, setFavorites] = useState({
        ...userFavorites
    })
    const [totalCost, setTotalCost] = useState(0)
    const [allMark, setAllMark] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        totalCostCalculating(currentBasket)
    }, [])
    function totalCostCalculating(basket) {
        let basketCost = 0
        Object.values(basket.goods).forEach((elem) => {
            basketCost +=
                getGoodPrice(elem.goodId, arrayOfGoods) * elem.goodQuantity
        })
        setTotalCost(basketCost)
    }
    function handleIncrement(target) {
        const id = target.target.id
        const temp = { ...currentBasket.goods[id] }
        temp.goodQuantity += 1
        const tempBasket = {
            ...currentBasket,
            goods: {
                ...currentBasket.goods,
                [id]: temp
            }
        }
        dispatch(updateBasket(tempBasket))
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleDecrement(target) {
        const id = target.target.id
        let tempBasket = {}
        if (currentBasket.goods[id].goodQuantity > 1) {
            const temp = { ...currentBasket.goods[id] }
            temp.goodQuantity -= 1
            tempBasket = {
                ...currentBasket,
                goods: {
                    ...currentBasket.goods,
                    [id]: temp
                }
            }
        } else {
            const temp = { ...currentBasket.goods }
            delete temp[id]
            tempBasket = {
                ...currentBasket,
                goods: temp
            }
        }
        dispatch(updateBasket(tempBasket))
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleDelete(target) {
        const id = target.target.id
        const temp = { ...currentBasket.goods }
        delete temp[id]
        const tempBasket = {
            ...currentBasket,
            goods: temp
        }
        dispatch(updateBasket(tempBasket))
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleDeleteChosen() {
        const temp = { ...currentBasket.goods }
        for (const good of Object.keys(temp)) {
            if (temp[good].chosen) {
                delete temp[good]
            }
        }
        const tempBasket = {
            ...currentBasket,
            goods: temp
        }
        dispatch(updateBasket(tempBasket))
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleGoodMark({ name, newValue }) {
        const temp = { ...currentBasket.goods[name] }
        temp.chosen = newValue
        const tempBasket = {
            ...currentBasket,
            goods: {
                ...currentBasket.goods,
                [name]: temp
            }
        }
        setCurrentBasket(tempBasket)
        dispatch(updateBasket(tempBasket))
    }
    function handleMarkAll({ newValue }) {
        setAllMark(newValue)
        let tempBasket = { ...currentBasket }
        for (const good of Object.values(currentBasket.goods)) {
            const temp = { ...good }
            temp.chosen = newValue
            tempBasket = {
                ...tempBasket,
                goods: {
                    ...tempBasket.goods,
                    [good.goodId]: temp
                }
            }
        }
        setCurrentBasket(tempBasket)
        dispatch(updateBasket(tempBasket))
    }
    function handleAddToFavorites(target) {
        console.log(target.target)
        const id = target.target.id
        console.log(id)
        const temp = {
            ...favorites,
            [id]: id
        }
        setFavorites(temp)
        dispatch(updateFavorites(temp))
    }
    function handleGoToCheckout() {
        let readyToOrder = false
        for (const good of Object.values(currentBasket.goods)) {
            if (good.chosen === true) {
                readyToOrder = true
                break
            }
        }
        if (readyToOrder) {
            navigate("/checkout")
        } else {
            alert("Вам нужно выбрать хотя бы один товар")
        }
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-light m-5">
                <div className="container">
                    <div>
                        <CheckBoxField
                            name="markAll"
                            value={allMark}
                            onChange={handleMarkAll}
                        >
                            Выбрать все
                        </CheckBoxField>
                    </div>
                    <div>
                        <button
                            className="btn btn-danger"
                            onClick={handleDeleteChosen}
                        >
                            Удалить выбранное
                        </button>
                    </div>
                    <div className="d-flex">
                        <div>
                            <h4>Общая стоимость: {totalCost} Р </h4>
                        </div>
                        <div>
                            <button
                                className="btn btn-warning"
                                onClick={handleGoToCheckout}
                            >
                                Оформление
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-light bg-light m-5">
                {Object.values(currentBasket.goods).map((item) => (
                    <div className="container mb-3" key={item.goodId}>
                        <div>
                            <CheckBoxField
                                name={item.goodId}
                                value={item.chosen}
                                onChange={handleGoodMark}
                            />
                        </div>
                        <div className="col-2">
                            <img
                                src={getGoodImage(item.goodId, arrayOfGoods)}
                                width="150 px"
                            />
                        </div>
                        <div className="col">
                            <h3>{getGoodName(item.goodId, arrayOfGoods)}</h3>
                            <div className="row align-items-center">
                                <div className="col-3">
                                    {Object.keys(favorites).includes(item.goodId) ? (
                                        <button className="btn btn-info">
                                            Уже в избранном
                                        </button>
                                    ) : (
                                        <button
                                            id={item.goodId}
                                            className="btn btn-info"
                                            onClick={handleAddToFavorites}
                                        >
                                            В избранное
                                        </button>
                                    )}
                                </div>
                                <div className="col">
                                    <button
                                        className="btn btn-danger"
                                        id={item.goodId}
                                        onClick={handleDelete}
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <div className="col">
                                    <span className="badge bg-warning text-dark p-3">
                                        Количество: {item.goodQuantity}
                                    </span>
                                </div>
                                <div className="col-1">
                                    <button
                                        className="btn btn-warning"
                                        id={item.goodId}
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                        className="btn btn-warning"
                                        id={item.goodId}
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <h2>
                                {getGoodPrice(item.goodId, arrayOfGoods) *
                                    item.goodQuantity} Р
                            </h2>
                        </div>
                    </div>
                ))}
            </nav>
        </>
    )
}
BasketLayout.propTypes = {
    userBasket: PropTypes.object,
    arrayOfGoods: PropTypes.array,
    userFavorites: PropTypes.object
}

export default BasketLayout
