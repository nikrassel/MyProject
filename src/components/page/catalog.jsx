import React from "react"
import { useParams } from "react-router-dom"
import GoodLayout from "../common/goodPage/goodLayout"
import CategoryLayout from "../common/categoryPage/categoryLayout"
import { useSelector } from "react-redux"
import { getCategoryByName } from "../../store/categories"
import { getBasket } from "../../store/basket"
import { getFavorites } from "../../store/favorites"
import { getIsLoggedIn } from "../../store/user"

const Catalog = () => {
    const { category, good } = useParams()
    const currentCategory = useSelector(getCategoryByName(category))
    const isLoggedIn = useSelector(getIsLoggedIn())
    const userBasket = useSelector(getBasket())
    const userFavorites = useSelector(getFavorites())
    if (!isLoggedIn || (userBasket && userFavorites)) {
        return (
            <>
                {currentCategory ? (
                    good ? (
                        <div className="mb-4 offset-md-3">
                            <GoodLayout
                                userBasket={userBasket}
                                userFavorites={userFavorites}
                                isLoggedIn={isLoggedIn}
                            />
                        </div>
                    ) : (
                        <div className="mb-4 offset-md-3">
                            <h1>Страница {category}</h1>
                            <CategoryLayout
                                currentCategory={currentCategory}
                                userBasket={userBasket}
                                isLoggedIn={isLoggedIn}
                            />
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
    return "Loading..."
}

export default Catalog
