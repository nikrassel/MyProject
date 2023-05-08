import React from "react"
import { useParams } from "react-router-dom"
import { getOrders } from "../../store/orders"
import { useSelector } from "react-redux"
import { getGoods } from "../../store/goods"
import AllOrders from "../common/orders/allOrders"
import SingleOrder from "../common/orders/singleOrder"
import { getFavorites } from "../../store/favorites"

const UserOrders = () => {
    const orders = useSelector(getOrders())
    const arrayOfGoods = useSelector(getGoods())
    const userFavorites = useSelector(getFavorites())
    const { number } = useParams()
    if (orders && arrayOfGoods && userFavorites) {
        const currentOrder = orders.find(
            (order) => order.orderNumber === number
        )
        return (
            <>
                {currentOrder ? (
                    <SingleOrder
                        currentOrder={currentOrder}
                        arrayOfGoods={arrayOfGoods}
                        userFavorites={userFavorites}
                    />
                ) : (
                    <AllOrders orders={orders} arrayOfGoods={arrayOfGoods} />
                )}
            </>
        )
    }
    return (
        <div className="container-fluid mt-5">
            <h2>У вас пока нет заказов</h2>
        </div>
    )
}

export default UserOrders
