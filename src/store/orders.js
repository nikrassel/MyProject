import { createAction, createSlice } from "@reduxjs/toolkit"
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
        },
        orderCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        hideOrders: (state) => {
            state.entities = null
        }
    }
})

const { reducer: ordersReducer, actions } = ordersSlice
const { ordersRequested, ordersReceved, ordersRequestFailed, orderCreated, hideOrders } = actions
const orderCreateRequested = createAction("order/createRequested")
const createOrderFailed = createAction("order/createFailed")

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
export const loadUserOrders = () => async (dispatch, getState) => {
    const { lastFetch } = getState().orders
    if (isOutdated(lastFetch)) {
        dispatch(ordersRequested())
        try {
            const { content } = await ordersService.getUserOrders()
            dispatch(ordersReceved(content))
        } catch (error) {
            dispatch(ordersRequestFailed(error.message))
        }
    }
}
export function createOrder(payload) {
    return async function(dispatch) {
        dispatch(orderCreateRequested())
        try {
            const { content } = await ordersService.create(payload)
            dispatch(orderCreated(content))
        } catch (error) {
            dispatch(createOrderFailed(error.message))
        }
    }
}
export const refreshOrders = () => (dispatch) => {
    dispatch(hideOrders())
}

export const getOrders = () => (state) => state.orders.entities

export default ordersReducer
