import { combineReducers, configureStore } from "@reduxjs/toolkit"
import goodsReducer from "./goods"
import basketReducer from "./basket"
import categoriesReducer from "./categories"
import ordersReducer from "./orders"
import userReducer from "./user"
import favoritesReducer from "./favorites"

const rootReducer = combineReducers({
    goods: goodsReducer,
    basket: basketReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    user: userReducer,
    favorites: favoritesReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
