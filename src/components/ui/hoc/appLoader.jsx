import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadGoodsList } from "../../../store/goods"
import PropTypes from "prop-types"
import { loadUserBasket } from "../../../store/basket"
import { loadCategoriesList } from "../../../store/categories"
import { getIsLoggedIn, loadUserInfo } from "../../../store/user"
import { loadUserOrders } from "../../../store/orders"
import { loadUserFavorites } from "../../../store/favorites"

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())
    dispatch(loadGoodsList())
    dispatch(loadCategoriesList())
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUserBasket())
            dispatch(loadUserInfo())
            dispatch(loadUserOrders())
            dispatch(loadUserFavorites())
        }
    }, [isLoggedIn])
    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
export default AppLoader
