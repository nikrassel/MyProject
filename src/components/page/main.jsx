import React from "react"
import LowerNavBar from "../ui/lowerNavBar"
import MiddleNavBar from "../ui/middleNavBar"
import CarouselComponent from "../ui/carouselComponent"
import MarketingPosts from "../ui/marketingPosts"

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
