import React from "react"
import LowerNavBar from "../ui/lowerNavBar"
import MiddleNavBar from "../ui/middleNavBar"
import CarouselComponent from "../ui/carouselComponent"
import MarketingPosts from "../ui/marketingPosts"
import { useSelector } from "react-redux"
import { getGoods } from "../../store/goods"
import { getBasket } from "../../store/basket"
import { getCategories } from "../../store/categories"
import { getOrders } from "../../store/orders"

const Main = () => {
    const goods = useSelector(getGoods())
    const basket = useSelector(getBasket())
    const categories = useSelector(getCategories())
    const orders = useSelector(getOrders())
    console.log("goodsList", goods)
    console.log("basket", basket)
    console.log("categories", categories)
    console.log("orders", orders)
    return (
        <>
            <MiddleNavBar />
            <LowerNavBar />
            <h1>Главная страница</h1>
            <CarouselComponent />
            <MarketingPosts />
        </>
    )
}

export default Main
