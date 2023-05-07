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
        // const changedBasket = []
        // for (const good of userBasket) {
        //     const nextGood = {
        //         ...good
        //     }
        //     changedBasket.push(nextGood)
        // }
        return (
            <>
                <MiddleNavBar />
                <LowerNavBar />
                {userBasket.goods
                    ? (
                        <BasketLayout
                            userBasket={userBasket}
                            arrayOfGoods={arrayOfGoods}
                        />
                    )
                    : (<h2>В вашей корзине ничего нет</h2>)
                }
            </>
        )
    }
    return <h2>Loading...</h2>
}

export default UserBasket
