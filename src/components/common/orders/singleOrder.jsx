import React, { useState } from "react"
import PropTypes from "prop-types"
import { getGoodImage, getGoodName } from "../../../utils/goodInBasket"
import dateFormater from "../../../utils/dateFormater"
import { useDispatch } from "react-redux"
import { updateFavorites } from "../../../store/favorites"

const SingleOrder = ({ currentOrder, arrayOfGoods, userFavorites, userInfo }) => {
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
            <div className="container">
                <div className="row container-fluid">
                    <div className="card" style={{ width: "20rem" }}>
                        <p>Идентификатор заказа: {currentOrder.orderNumber}</p>
                        <p>Дата размещения: {dateFormater(currentOrder.date)}</p>
                        <h5>Получатель: {userInfo.name}</h5>
                    </div>
                    <div className="card" style={{ width: "20rem" }}>
                        <h5>Дата размещения: {dateFormater(currentOrder.date)}</h5>
                        <p>Ожидаемая дата получения: {dateFormater(Date.now())}</p>
                        <p>Тип оплаты: {currentOrder.payMethod}</p>
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
                        <div className="row align-items-center" key={id}>
                            <div className="col-2">
                                <img
                                    src={getGoodImage(id, arrayOfGoods)}
                                    width="150 px"
                                />
                            </div>
                            <div className="col-2">
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
    userFavorites: PropTypes.object,
    userInfo: PropTypes.object
}
export default SingleOrder
