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
                    <div className="mb-4 offset-md-3">
                        <GoodLayout />
                    </div>
                ) : (
                    <div className="mb-4 offset-md-3">
                        <h1>Страница {category}</h1>
                        <CategoryLayout currentCategory={currentCategory} />
                    </div>
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
