import React from "react"
import { logo } from "../../utils/temporaryDataBase"
import { useSelector, useDispatch } from "react-redux"
import { getUserInfo, logOut } from "../../store/user"
import { useNavigate } from "react-router-dom"
import FavoritesLayout from "../common/cabinent/favoritesLayout"

const UserCabinet = () => {
    const userInfo = useSelector(getUserInfo())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleLogOut() {
        dispatch(logOut())
        navigate("/")
    }
    return (
        <>
            {userInfo ? (
                <div className="mb-4 offset-md-3">
                    <div className="row container-fluid mt-3 mb-3">
                        <div className="card" style={{ width: "20rem" }}>
                            <img src={logo} alt="" />
                        </div>
                        <div className="card" style={{ width: "20rem" }}>
                            <h5>{userInfo.name}</h5>
                            <p>Телефон</p>
                            <p>{userInfo.email}</p>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleLogOut}
                            >
                                Выйти
                            </button>
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
                            Личные данные
                        </button>
                        <button type="button" className="btn btn-primary">
                            Уведомления
                        </button>
                        <button type="button" className="btn btn-primary">
                            Избранное
                        </button>
                    </div>
                    <FavoritesLayout />
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </>
    )
}

export default UserCabinet
