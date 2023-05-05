import React from "react"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"
import { useSelector } from "react-redux"
import { getBasket } from "../../store/basket"
import BasketLayout from "../common/basket/basketLayout"
import { getGoods } from "../../store/goods"

const UserBasket = () => {
    const userBasket = useSelector(getBasket())
    const arrayOfGoods = useSelector(getGoods())
    if (userBasket && arrayOfGoods) {
        const changedBasket = []
        for (const good of userBasket) {
            const nextGood = {
                ...good
            }
            changedBasket.push(nextGood)
        }
        return (
            <>
                <MiddleNavBar />
                <LowerNavBar />
                <BasketLayout
                    userBasket={changedBasket}
                    arrayOfGoods={arrayOfGoods}
                />
            </>
        )
    }
    return <h2>Loading...</h2>
}

export default UserBasket
