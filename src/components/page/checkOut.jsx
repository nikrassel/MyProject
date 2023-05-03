import React, { useState } from "react"
import { arrayOfGoods, basket } from "../utils/temporaryDataBase"
import { getGoodImage, getGoodName } from "../utils/goodInBasket"
import RadioField from "../common/form/radioField"

const CheckOut = () => {
    const [data, setData] = useState({
        payMethod: "Картой онлайн",
        delivery: "Самовывоз",
        isReady: false
    })
    function handleChange({ name, value }) {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    function handleFinish() {
        setData((prevState) => ({
            ...prevState,
            isReady: true
        }))
    }
    if (!data.isReady) {
        return (
            <div className="container mt-5">
                <div className="row gutters-sm">
                    <div className="col-md-8">
                        <div className="card mb-2">
                            <div className="card-body">
                                <h3>Способы доставки</h3>
                                <RadioField
                                    options={[
                                        {
                                            name: "Самовывоз",
                                            value: "Самовывоз"
                                        },
                                        { name: "Курьер", value: "Курьер" },
                                        { name: "Почта", value: "Почта" }
                                    ]}
                                    value={data.delivery}
                                    name="delivery"
                                    label="Выберите способ доставки"
                                    onChange={handleChange}
                                />
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
                                            {getGoodName(
                                                item.goodId,
                                                arrayOfGoods
                                            )}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="card mb-2">
                            <div className="card-body">
                                <h3>Способы оплаты</h3>
                                <RadioField
                                    options={[
                                        {
                                            name: "Картой онлайн",
                                            value: "Картой онлайн"
                                        },
                                        {
                                            name: "При получении",
                                            value: "При получении"
                                        },
                                        { name: "СБП", value: "СБП" }
                                    ]}
                                    value={data.payMethod}
                                    name="payMethod"
                                    label="Выберите способ оплаты"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <p>Способ доставки: {data.delivery}</p>
                                <p>Способ оплаты: {data.payMethod}</p>
                                <h4>Итоговая стоимость</h4>
                                <button
                                    className="btn btn-warning"
                                    onClick={handleFinish}
                                >
                                    Оплатить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container-fluid mt-5">
            <h2>Спасибо за ваш заказ!</h2>
        </div>
    )
}

export default CheckOut
