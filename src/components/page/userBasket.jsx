import React from "react"
import CheckBoxField from "../common/form/checkBoxField"
import { arrayOfGoods, basket } from "../utils/temporaryDataBase"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"

const UserBasket = () => {
    const currentBasket = []
    basket.goods.forEach((elem) => {
        let newGood = arrayOfGoods.find((good) => good.id === elem)
        const quantity = basket.goodsQuantity[elem]
        newGood = {
            ...newGood,
            goodQuantity: quantity
        }
        currentBasket.push(newGood)
    })
    function totalCost(basket) {
        let totalCost = 0
        basket.forEach((elem) => {
            totalCost += elem.price * elem.goodQuantity
        })
        return totalCost
    }
    function handleIncrement(target) {
        const chosenGood = currentBasket.findIndex((elem) => elem.id === target.target.id)
        currentBasket[chosenGood] += 1
    }
    return (
        <>
            <MiddleNavBar />
            <LowerNavBar />
            <nav className="navbar navbar-dark bg-light m-5">
                <div className="container">
                    <div>
                        <CheckBoxField>Выбрать все</CheckBoxField>
                    </div>
                    <div>
                        <button className="btn btn-danger">
                            Удалить выбранное
                        </button>
                    </div>
                    <div className="d-flex">
                        <div>
                            <h4>Общая стоимость: {totalCost(currentBasket)}</h4>
                        </div>
                        <div>
                            <button className="btn btn-warning">Оформление</button>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-light bg-light m-5">
                {currentBasket.map((item) => (
                    <div className="container" key={item.id}>
                        <div>
                            <CheckBoxField />
                        </div>
                        <div className="col-lg-3">
                            <img src={item.img} width="150 px" />
                        </div>
                        <div className="col">
                            <h3>{item.name}</h3>
                            <button className="btn btn-info b-2">
                                В избранное
                            </button>
                            <button className="btn btn-danger">Удалить</button>
                            <span className="badge bg-warning text-dark p-3">Количество: {item.goodQuantity}</span>
                            <button className="btn btn-warning" id={item.id} onClick={handleIncrement}>+</button>
                            <button className="btn btn-warning" id={item.id}>-</button>
                        </div>
                        <div className="col-lg-3">
                            <h2>{item.price * item.goodQuantity}</h2>
                        </div>
                    </div>
                ))}
            </nav>
        </>
    )
}

export default UserBasket

// {/* <div className="container">
//                 {currentBasket.map((item) => (
//                     <div className="row" key={item.id}>
//                         <div className="col-lg-2">
//                             <CheckBoxField />
//                         </div>
//                         <div className="col-lg-3">
//                             <img src={item.img} width="150 px" />
//                         </div>
//                         <div className="col">
//                             <h3>{item.name}</h3>
//                             <button className="btn btn-info">
//                                 В избранное
//                             </button>
//                             <button className="btn btn-danger">Удалить</button>
//                             <span className="badge bg-warning">Количество</span>
//                             <button className="btn btn-warning">+</button>
//                             <button className="btn btn-warning">-</button>
//                         </div>
//                         <div className="col-lg-3">
//                             <h2>{item.price}</h2>
//                         </div>
//                     </div>
//                 ))}
//             </div> */}

// {currentBasket.map((item) => (
//     <tr key={item.id}>
//         <td className="p-5">
//             <CheckBoxField />
//         </td>
//         <td>
//             <img src={item.img} width="150 px" />
//         </td>
//         <td className="p-5">
//             <h3 className="text-align-center">{item.name}</h3>
//             <button className="btn btn-info">
//                 В избранное
//             </button>
//             <button className="btn btn-danger">
//                 Удалить
//             </button>
//             <span className="badge bg-warning">
//                 Количество
//             </span>
//             <button className="btn btn-warning">+</button>
//             <button className="btn btn-warning">-</button>
//         </td>
//         <td className="p-5 pt-8">
//             <h2>{item.price}</h2>
//         </td>
//     </tr>
// ))}
