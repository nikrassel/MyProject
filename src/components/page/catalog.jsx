import React from "react"
import { useParams } from "react-router-dom"
import { mainCategories } from "../utils/temporaryDataBase"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"
import GoodLayout from "../common/goodPage/goodLayout"

import CategoryLayout from "../common/categoryPage/categoryLayout"

const Catalog = () => {
    const { category, good } = useParams()
    let currentCategory
    if (mainCategories.includes(category)) {
        currentCategory = category
    }
    return (
        <>
            <MiddleNavBar />
            <LowerNavBar />
            {currentCategory ? (
                good ? (
                    <>
                        <GoodLayout />
                    </>
                ) : (
                    <>
                        <h1>Страница {category}</h1>
                        <CategoryLayout currentCategory={currentCategory} />
                    </>
                )
            ) : (
                <>
                    <h1>Страница не найдена</h1>
                </>
            )}
        </>
    )
}

export default Catalog
