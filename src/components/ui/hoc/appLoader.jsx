import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadGoodsList } from "../../../store/goods"
import PropTypes from "prop-types"
import { loadUserBasket } from "../../../store/basket"
import { loadCategoriesList } from "../../../store/categories"
import { getIsLoggedIn, loadUserInfo } from "../../../store/user"
import { getUserId } from "../../../services/localStorage.service"
import { loadUserOrders } from "../../../store/orders"

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())
    dispatch(loadGoodsList())
    dispatch(loadCategoriesList())
    useEffect(() => {
        if (isLoggedIn) {
            const userId = getUserId()
            dispatch(loadUserBasket(userId))
            dispatch(loadUserInfo())
            dispatch(loadUserOrders())
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
