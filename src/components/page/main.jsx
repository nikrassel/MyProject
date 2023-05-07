import React from "react"
import LowerNavBar from "../ui/lowerNavBar"
import MiddleNavBar from "../ui/middleNavBar"
import CarouselComponent from "../ui/carouselComponent"
import MarketingPosts from "../ui/marketingPosts"
// import { useSelector } from "react-redux"
// import { getGoods } from "../../store/goods"
// import { getBasket } from "../../store/basket"
// import { getCategories } from "../../store/categories"
// import { getOrders } from "../../store/orders"

const Main = () => {
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
