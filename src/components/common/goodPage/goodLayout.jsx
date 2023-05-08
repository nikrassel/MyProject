import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getGoodById, getRecommendation } from "../../../store/goods"
import PropTypes from "prop-types"
import { goodCheck } from "../../../utils/goodInBasket"
import { updateBasket } from "../../../store/basket"
import { updateFavorites } from "../../../store/favorites"

const GoodLayout = ({ userBasket, userFavorites, isLoggedIn }) => {
    const { good } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [basket, setBasket] = useState({
        ...userBasket
    })
    const [favorites, setFavorites] = useState({
        ...userFavorites
    })
    const currentGood = useSelector(getGoodById(good))
    const recommendation = useSelector(getRecommendation(good))
    function handleReccomendation(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${recommendation.category}/${endPoint}`)
    }
    function checkLoggedIn() {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }
    function handleBuy(target) {
        checkLoggedIn()
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
        dispatch(
            updateBasket({
                ...temp
            })
        )
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
        dispatch(
            updateBasket({
                ...tempBasket
            })
        )
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
        dispatch(
            updateBasket({
                ...tempBasket
            })
        )
    }
    function handleAddToFavorites() {
        checkLoggedIn()
        const temp = {
            ...favorites,
            [currentGood.id]: currentGood.id
        }
        setFavorites(temp)
        dispatch(updateFavorites(temp))
    }
    if (currentGood) {
        return (
            <>
                <h2>{currentGood.name}</h2>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <img src={currentGood.img} width="300 px" />
                        </div>
                        <div className="col-md-4">
                            <div className="mb-2">
                                <span>
                                    <strong>{currentGood.price} Р </strong>
                                </span>
                                <span>Вы получите х бонусов</span>
                            </div>
                            {basket.goods &&
                            Object.keys(basket.goods).includes(
                                currentGood.id
                            ) ? (
                                    <div>
                                        <button
                                            id={currentGood.id}
                                            className="btn btn-warning"
                                            onClick={handleDecrement}
                                        >
                                            -
                                        </button>
                                        <span className="badge bg-warning text-dark p-3 m-2">
                                            {
                                                basket.goods[currentGood.id]
                                                    .goodQuantity
                                            }
                                        </span>
                                        <button
                                            id={currentGood.id}
                                            className="btn btn-warning"
                                            onClick={handleIncrement}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        id={currentGood.id}
                                        className="btn btn-warning"
                                        onClick={handleBuy}
                                    >
                                        Купить
                                    </button>
                                )}
                            <br />
                            {Object.keys(favorites).includes(currentGood.id) ? (
                                <span className="badge bg-info text-dark p-3 m-2">
                                    Уже в избранном
                                </span>
                            ) : (
                                <button
                                    className="btn btn-info"
                                    onClick={handleAddToFavorites}
                                >
                                    В избранное
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <p>{currentGood.fullDescription}</p>
                    </div>
                    {recommendation && (
                        <div className="col-md-4">
                            <h4>Рекомендуем Вам</h4>
                            <div className="card" style={{ width: "14rem" }}>
                                <img
                                    src={recommendation.img}
                                    className="card-img-top"
                                    width="100 px"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h6
                                        className="card-title"
                                        role="button"
                                        id={recommendation.id}
                                        onClick={handleReccomendation}
                                    >
                                        {recommendation.name}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <h2>Page not found</h2>
            </>
        )
    }
}

GoodLayout.propTypes = {
    userBasket: PropTypes.object,
    userFavorites: PropTypes.object,
    isLoggedIn: PropTypes.bool
}

export default GoodLayout
