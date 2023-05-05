import { createSlice } from "@reduxjs/toolkit"
import ordersService from "../services/orders.service"
import isOutdated from "../utils/dateChecker"

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        ordersRequested: (state) => {
            state.isLoading = true
        },
        ordersReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        ordersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: ordersReducer, actions } = ordersSlice
const { ordersRequested, ordersReceved, ordersRequestFailed } = actions

export const loadOrdersList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().orders
    if (isOutdated(lastFetch)) {
        dispatch(ordersRequested())
        try {
            const { content } = await ordersService.get()
            dispatch(ordersReceved(content))
        } catch (error) {
            dispatch(ordersRequestFailed(error.message))
        }
    }
}

export const getOrders = () => (state) => state.orders.entities

export default ordersReducer
