import React from "react"
// import { orders, arrayOfGoods } from "../../utils/temporaryDataBase"
import { getGoodImage, getGoodName } from "../../utils/goodInBasket"
import dateFormater from "../../utils/dateFormater"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"
import { useParams, useNavigate } from "react-router-dom"
import { getOrders } from "../../store/orders"
import { useSelector } from "react-redux"
import { getGoods } from "../../store/goods"

const UserOrders = () => {
    const orders = useSelector(getOrders())
    const arrayOfGoods = useSelector(getGoods())
    const { number } = useParams()
    const navigate = useNavigate()

    function handleChoseOrder(target) {
        const endPoint = target.target.id
        navigate(`/orders/${endPoint}`)
    }
    if (orders && arrayOfGoods) {
        const currentOrder = orders.find(
            (order) => order.orderNumber === number
        )
        return (
            <>
                <MiddleNavBar />
                <LowerNavBar />
                {currentOrder ? (
                    <>
                        <h2>Номер заказ: {currentOrder.orderNumber}</h2>
                        <h3>
                            Дата размещения: {dateFormater(currentOrder.date)}
                        </h3>
                        <div
                            className="card mb-4 offset-md-3"
                            style={{ width: "60rem" }}
                        >
                            <div className="row container-fluid">
                                <div
                                    className="card"
                                    style={{ width: "20rem" }}
                                >
                                    <p>
                                        Спобос доставки: {currentOrder.delivery}
                                    </p>
                                    <p>Инфо по доставке</p>
                                    <h5>Получатель</h5>
                                    <p>Инфо о получате</p>
                                </div>
                                <div
                                    className="card"
                                    style={{ width: "20rem" }}
                                >
                                    <h5>Оплачено</h5>
                                    <p>Товары</p>
                                    <p>Доставка</p>
                                    <p>Итого</p>
                                </div>
                                <div
                                    className="card"
                                    style={{ width: "18rem" }}
                                >
                                    <span className="badge bg-info text-dark p-3 float-end">
                                        {currentOrder.status}
                                    </span>
                                    <a href="">Электронный чек</a>
                                    <a href="">Повторить заказ</a>
                                    <a href="">Возврат</a>
                                </div>
                            </div>
                            <div className="mt-5">
                                {currentOrder.goodsIds.map((id) => (
                                    <div className="row" key={id}>
                                        <div className="col">
                                            <img
                                                src={getGoodImage(
                                                    id,
                                                    arrayOfGoods
                                                )}
                                                width="150 px"
                                            />
                                        </div>
                                        <div className="col">
                                            <h3>
                                                {getGoodName(id, arrayOfGoods)}
                                            </h3>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-info b-2">
                                                В избранное
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container mb-4">
                            <h2>Фильтры</h2>
                        </div>
                        {orders.map((item) => (
                            <div
                                className="card mb-4 offset-md-3"
                                style={{ width: "48rem" }}
                                key={item.orderNumber}
                            >
                                <div className="col">
                                    <a
                                        href=""
                                        id={item.orderNumber}
                                        onClick={handleChoseOrder}
                                    >
                                        Номер заказ: {item.orderNumber}
                                    </a>
                                    <a>
                                        {" "}
                                        Дата заказ: {dateFormater(item.date)}
                                    </a>
                                    <span className="badge bg-info text-dark p-3 float-end">
                                        {item.status}
                                    </span>
                                </div>
                                <div>
                                    {item.goodsIds.map((id) => (
                                        <img
                                            src={getGoodImage(id, arrayOfGoods)}
                                            width="150 px"
                                            key={id}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </>
        )
    }
    return (
        <div className="container-fluid mt-5">
            <h2>Loading...</h2>
        </div>
    )
}

export default UserOrders
