import { combineReducers, configureStore } from "@reduxjs/toolkit"
import goodsReducer from "./goods"
import basketReducer from "./basket"
import categoriesReducer from "./categories"
import ordersReducer from "./orders"

const rootReducer = combineReducers({
    goods: goodsReducer,
    basket: basketReducer,
    categories: categoriesReducer,
    orders: ordersReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
