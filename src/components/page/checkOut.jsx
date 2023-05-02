import React from "react"
import { arrayOfGoods, basket } from "../utils/temporaryDataBase"
import { getGoodImage, getGoodName } from "../utils/goodInBasket"

const CheckOut = () => {
    return (
        <div className="container mt-5">
            <div className="row gutters-sm">
                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <h3>Способы доставки</h3>
                        </div>
                    </div>
                    {basket.map((item) => (
                        <div className="container" key={item.goodId}>
                            <div className="row">
                                <div className="col-lg-3">
                                    <img
                                        src={getGoodImage(
                                            item.goodId,
                                            arrayOfGoods
                                        )}
                                        width="150 px"
                                    />
                                </div>
                                <div className="col">
                                    <h3>
                                        {getGoodName(item.goodId, arrayOfGoods)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="card mb-2">
                        <div className="card-body">
                            <h3>Способы оплаты</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <p>Способ доставки: </p>
                            <p>Способ оплаты</p>
                            <h4>Итоговая стоимость</h4>
                            <button className="btn btn-warning">
                                Оплатить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
