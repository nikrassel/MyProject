import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFavorites, updateFavorites } from "../../../store/favorites"
import { getGoodImage, getGoodName, goodCheck } from "../../../utils/goodInBasket"
import { getGoods } from "../../../store/goods"
import { getBasket, updateBasket } from "../../../store/basket"

const FavoritesLayout = () => {
    const dispatch = useDispatch()
    const userFavorites = useSelector(getFavorites())
    const userBasket = useSelector(getBasket())
    const [favorites, setFavorites] = useState({
        ...userFavorites
    })
    const [basket, setBasket] = useState({
        ...userBasket
    })
    const arrayOfGoods = useSelector(getGoods())
    function handleRemoveFromFavorites(target) {
        const id = target.target.id
        const temp = {
            ...favorites
        }
        delete temp[id]
        setFavorites(temp)
        dispatch(updateFavorites(temp))
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
        dispatch(
            updateBasket({
                ...temp
            })
        )
    }
    if (userFavorites && favorites && arrayOfGoods) {
        return (
            <div>
                <h3>Ваши избранные товары</h3>
                <div className="row">
                    {Object.values(favorites).map((item) =>
                        item.length === 3 &&
                            (
                                <div className="card mb-4" style={{ width: "18rem" }} key={item}>
                                    <img src={getGoodImage(item, arrayOfGoods)} className="card-img-top" />
                                    <h5>{getGoodName(item, arrayOfGoods)}</h5>
                                    <button
                                        className="btn btn-danger mb-2"
                                        id={item}
                                        onClick={handleRemoveFromFavorites}
                                    >
                                        Удалить из избранного
                                    </button>
                                    {basket.goods &&
                                Object.keys(basket.goods).includes(item) ? (
                                            <span className="badge bg-warning text-dark p-3 m-2">
                                                Уже в корзине
                                            </span>
                                        ) : (
                                            <button
                                                id={item}
                                                className="btn btn-warning"
                                                onClick={handleBuy}
                                            >
                                                Добавить в корзину
                                            </button>
                                        )}
                                </div>
                            )
                    )}
                </div>
            </div>
        )
    }
    return "Loading..."
}

export default FavoritesLayout
