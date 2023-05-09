import React from "react"
import PropTypes from "prop-types"
import { getGoodImage } from "../../../utils/goodInBasket"
import dateFormater from "../../../utils/dateFormater"
import { useNavigate } from "react-router-dom"

const AllOrders = ({ orders, arrayOfGoods }) => {
    const navigate = useNavigate()
    function handleChoseOrder(target) {
        const endPoint = target.target.id
        navigate(`/orders/${endPoint}`)
    }
    return (
        <>
            <div className="container mb-4">
                <h2>Фильтры</h2>
            </div>
            {orders.map((item) => (
                <div
                    className="card mb-4"
                    style={{ width: "48rem" }}
                    key={item.orderNumber}
                >
                    <div className="col">
                        <a
                            href=""
                            id={item.orderNumber}
                            onClick={handleChoseOrder}
                        >
                            Идентификатор заказа: {item.orderNumber}
                        </a>
                        <a> Дата заказ: {dateFormater(item.date)}</a>
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
    )
}

AllOrders.propTypes = {
    orders: PropTypes.array,
    arrayOfGoods: PropTypes.array
}
export default AllOrders
