import { createSlice } from "@reduxjs/toolkit"
import basketService from "../services/basket.service"
import isOutdated from "../utils/dateChecker"

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        basketRequested: (state) => {
            state.isLoading = true
        },
        basketReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        basketRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: basketReducer, actions } = basketSlice
const { basketRequested, basketReceved, basketRequestFailed } = actions

export const loadBasket = () => async (dispatch, getState) => {
    const { lastFetch } = getState().basket
    if (isOutdated(lastFetch)) {
        dispatch(basketRequested())
        try {
            const { content } = await basketService.get()
            dispatch(basketReceved(content))
        } catch (error) {
            dispatch(basketRequestFailed(error.message))
        }
    }
}

export const getBasket = () => (state) => state.basket.entities

export default basketReducer
