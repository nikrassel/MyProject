import React from "react"
import { useParams } from "react-router-dom"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"
import GoodLayout from "../common/goodPage/goodLayout"
import CategoryLayout from "../common/categoryPage/categoryLayout"
import { useSelector } from "react-redux"
import { getCategoryByName } from "../../store/categories"

const Catalog = () => {
    const { category, good } = useParams()
    const currentCategory = useSelector(getCategoryByName(category))
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
