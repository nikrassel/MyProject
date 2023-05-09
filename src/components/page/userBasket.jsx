import React from "react"
import { useSelector } from "react-redux"
import { getBasket } from "../../store/basket"
import BasketLayout from "../common/basket/basketLayout"
import { getGoods } from "../../store/goods"
import { getFavorites } from "../../store/favorites"

const UserBasket = () => {
    const userBasket = useSelector(getBasket())
    const arrayOfGoods = useSelector(getGoods())
    const userFavorites = useSelector(getFavorites())
    if (userBasket && arrayOfGoods && userFavorites) {
        return (
            <>
                {userBasket.goods ? (
                    <BasketLayout
                        userBasket={userBasket}
                        arrayOfGoods={arrayOfGoods}
                        userFavorites={userFavorites}
                    />
                ) : (
                    <h2>В вашей корзине ничего нет</h2>
                )}
            </>
        )
    }
    return (
        <div className="container-fluid mt-5 pb-5">
            <h2>Для просмотра корзины вам необходимо авторизироваться</h2>
        </div>
    )
}

export default UserBasket
