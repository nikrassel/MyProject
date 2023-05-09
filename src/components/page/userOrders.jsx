import React from "react"
import { useParams } from "react-router-dom"
import { getOrders } from "../../store/orders"
import { useSelector } from "react-redux"
import { getGoods } from "../../store/goods"
import AllOrders from "../common/orders/allOrders"
import SingleOrder from "../common/orders/singleOrder"
import { getFavorites } from "../../store/favorites"
import { getUserInfo } from "../../store/user"

const UserOrders = () => {
    const orders = useSelector(getOrders())
    const arrayOfGoods = useSelector(getGoods())
    const userFavorites = useSelector(getFavorites())
    const userInfo = useSelector(getUserInfo())
    const { number } = useParams()
    if (orders && arrayOfGoods && userFavorites && userInfo) {
        const currentOrder = orders.find(
            (order) => order.orderNumber === number
        )
        return (
            <div className="container mt-5 offset-md-3">
                {currentOrder ? (
                    <SingleOrder
                        currentOrder={currentOrder}
                        arrayOfGoods={arrayOfGoods}
                        userFavorites={userFavorites}
                        userInfo={userInfo}
                    />
                ) : (
                    <AllOrders orders={orders} arrayOfGoods={arrayOfGoods} />
                )}
            </div>
        )
    }
    return (
        <div className="container-fluid mt-5 pb-5">
            <h2>У вас пока нет заказов</h2>
        </div>
    )
}

export default UserOrders
