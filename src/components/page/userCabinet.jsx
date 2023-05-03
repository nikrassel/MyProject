import React from "react"
import { logo } from "../utils/temporaryDataBase"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"

const UserCabinet = () => {
    return (
        <>
            <MiddleNavBar />
            <LowerNavBar />
            <div className="mb-4 offset-md-3">
                <div className="row container-fluid mt-3 mb-3">
                    <div className="card" style={{ width: "20rem" }}>
                        <img src={logo} alt="" />
                    </div>
                    <div className="card" style={{ width: "20rem" }}>
                        <h5>ФИО</h5>
                        <p>Телефон</p>
                        <p>Почта</p>
                    </div>
                    <div className="card" style={{ width: "18rem" }}>
                        <span className="badge bg-warning text-dark p-3 float-end">
                            Программа лояльности
                        </span>
                        <p>Ваш статус</p>
                        <p>Ваши баллы</p>
                    </div>
                </div>
                <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                >
                    <button type="button" className="btn btn-primary mr-2">
                        Заказы
                    </button>
                    <button type="button" className="btn btn-primary">
                        Уведомления
                    </button>
                    <button type="button" className="btn btn-primary">
                        Личные данные
                    </button>
                    <button type="button" className="btn btn-primary">
                        Избранное
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserCabinet
