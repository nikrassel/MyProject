import React, { useState } from "react"
import PropTypes from "prop-types"
import { getGoodImage, getGoodName } from "../../../utils/goodInBasket"
import dateFormater from "../../../utils/dateFormater"
import { useDispatch } from "react-redux"
import { updateFavorites } from "../../../store/favorites"

const SingleOrder = ({ currentOrder, arrayOfGoods, userFavorites }) => {
    const dispatch = useDispatch()
    const [favorites, setFavorites] = useState({
        ...userFavorites
    })
    function handleAddToFavorites(target) {
        const id = target.target.id
        const temp = {
            ...favorites,
            [id]: id
        }
        setFavorites(temp)
        dispatch(updateFavorites(temp))
    }
    return (
        <>
            <h2>Идентификатор заказа: {currentOrder.orderNumber}</h2>
            <h3>Дата размещения: {dateFormater(currentOrder.date)}</h3>
            <div className="card mb-4 offset-md-3" style={{ width: "60rem" }}>
                <div className="row container-fluid">
                    <div className="card" style={{ width: "20rem" }}>
                        <p>Спобос доставки: {currentOrder.delivery}</p>
                        <p>Инфо по доставке</p>
                        <h5>Получатель</h5>
                        <p>Инфо о получате</p>
                    </div>
                    <div className="card" style={{ width: "20rem" }}>
                        <h5>Оплачено</h5>
                        <p>Товары</p>
                        <p>Доставка</p>
                        <p>Итого</p>
                    </div>
                    <div className="card" style={{ width: "18rem" }}>
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
                                    src={getGoodImage(id, arrayOfGoods)}
                                    width="150 px"
                                />
                            </div>
                            <div className="col">
                                <h3>{getGoodName(id, arrayOfGoods)}</h3>
                            </div>
                            <div className="col">
                                {Object.keys(favorites).includes(id) ? (
                                    <span className="badge bg-info text-dark p-3 m-2">
                                        Уже в избранном
                                    </span>
                                ) : (
                                    <button
                                        className="btn btn-info"
                                        id={id}
                                        onClick={handleAddToFavorites}
                                    >
                                        В избранное
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

SingleOrder.propTypes = {
    arrayOfGoods: PropTypes.array,
    currentOrder: PropTypes.object,
    userFavorites: PropTypes.object
}
export default SingleOrder
