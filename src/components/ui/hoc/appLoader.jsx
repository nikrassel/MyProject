import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadGoodsList } from "../../../store/goods"
import PropTypes from "prop-types"
import { loadBasket } from "../../../store/basket"
import { loadCategoriesList } from "../../../store/categories"
import { loadOrdersList } from "../../../store/orders"

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadGoodsList())
        dispatch(loadBasket())
        dispatch(loadCategoriesList())
        dispatch(loadOrdersList())
    }, [])
    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
export default AppLoader
