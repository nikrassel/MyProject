import React, { useEffect, useState } from "react"
import CheckBoxField from "../common/form/checkBoxField"
import { arrayOfGoods, basket } from "../utils/temporaryDataBase"
import { getGoodImage, getGoodName, getGoodPrice } from "../utils/goodInBasket"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"
import { useNavigate } from "react-router-dom"

const UserBasket = () => {
    const [currentBasket, setCurrentBasket] = useState(basket)
    const [totalCost, setTotalCost] = useState(0)
    const [allMark, setAllMark] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        totalCostCalculating(currentBasket)
    }, [])
    function totalCostCalculating(basket) {
        let basketCost = 0
        basket.forEach((elem) => {
            basketCost +=
                getGoodPrice(elem.goodId, arrayOfGoods) * elem.goodQuantity
        })
        setTotalCost(basketCost)
    }
    function handleIncrement(target) {
        const chosenGood = currentBasket.findIndex(
            (elem) => elem.goodId === target.target.id
        )
        currentBasket[chosenGood].goodQuantity += 1
        const tempBasket = [...currentBasket]
        setCurrentBasket(tempBasket)
        totalCostCalculating(currentBasket)
    }
    function handleDecrement(target) {
        let tempBasket = []
        const chosenGood = currentBasket.findIndex(
            (elem) => elem.goodId === target.target.id
        )
        if (currentBasket[chosenGood].goodQuantity > 1) {
            currentBasket[chosenGood].goodQuantity -= 1
            tempBasket = [...currentBasket]
        } else {
            tempBasket = currentBasket.filter(
                (elem) => elem.goodId !== currentBasket[chosenGood].goodId
            )
        }
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleDelete(target) {
        const tempBasket = currentBasket.filter(
            (elem) => elem.goodId !== target.target.id
        )
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleDeleteChosen() {
        const tempBasket = currentBasket.filter((elem) => elem.chosen !== true)
        setCurrentBasket(tempBasket)
        totalCostCalculating(tempBasket)
    }
    function handleGoodMark({ name, newValue }) {
        const chosenGood = currentBasket.findIndex(
            (elem) => elem.goodId === name
        )
        currentBasket[chosenGood].chosen = newValue
        const temp = [...currentBasket]
        setCurrentBasket(temp)
    }
    function handleMarkAll({ newValue }) {
        console.log(newValue)
        setAllMark(newValue)
        const temp = currentBasket.map((elem) => {
            elem.chosen = newValue
            return elem
        })
        setCurrentBasket(temp)
    }
    function handleGoToCheckout() {
        console.log(currentBasket)
        navigate("/checkout")
    }
    return (
        <>
            <MiddleNavBar />
            <LowerNavBar />
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
                            <h4>Общая стоимость: {totalCost}</h4>
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
                {currentBasket.map((item) => (
                    <div className="container" key={item.goodId}>
                        <div>
                            <CheckBoxField
                                name={item.goodId}
                                value={item.chosen}
                                onChange={handleGoodMark}
                            />
                        </div>
                        <div className="col-lg-3">
                            <img
                                src={getGoodImage(item.goodId, arrayOfGoods)}
                                width="150 px"
                            />
                        </div>
                        <div className="col">
                            <h3>{getGoodName(item.goodId, arrayOfGoods)}</h3>
                            <button className="btn btn-info b-2">
                                В избранное
                            </button>
                            <button
                                className="btn btn-danger"
                                id={item.goodId}
                                onClick={handleDelete}
                            >
                                Удалить
                            </button>
                            <span className="badge bg-warning text-dark p-3">
                                Количество: {item.goodQuantity}
                            </span>
                            <button
                                className="btn btn-warning"
                                id={item.goodId}
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                            <button
                                className="btn btn-warning"
                                id={item.goodId}
                                onClick={handleDecrement}
                            >
                                -
                            </button>
                        </div>
                        <div className="col-lg-3">
                            <h2>
                                {getGoodPrice(item.goodId, arrayOfGoods) *
                                    item.goodQuantity}
                            </h2>
                        </div>
                    </div>
                ))}
            </nav>
        </>
    )
}

export default UserBasket
