import { createAction, createSlice } from "@reduxjs/toolkit"
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
        },
        basketCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        hideBasket: (state) => {
            state.entities = null
        },
        basketUpdate: (state, action) => {
            state.entities = action.payload
        }
    }
})

const { reducer: basketReducer, actions } = basketSlice
const { basketRequested, basketReceved, basketRequestFailed, basketCreated, hideBasket, basketUpdate } =
    actions
const basketCreateRequested = createAction("basket/createRequested")
const createBasketFailed = createAction("basket/createFailed")
const basketUpdateRequested = createAction("basket/updateRequested")
const basketUpdateFailed = createAction("basket/updateFailed")
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
export const loadUserBasket = (payload) => async (dispatch, getState) => {
    const { lastFetch } = getState().basket
    if (isOutdated(lastFetch)) {
        dispatch(basketRequested())
        try {
            const { content } = await basketService.getUserBasket(payload)
            dispatch(basketReceved(content))
        } catch (error) {
            dispatch(basketRequestFailed(error.message))
        }
    }
}
export function createBasket(payload) {
    return async function(dispatch) {
        dispatch(basketCreateRequested())
        try {
            const { content } = await basketService.create(payload)
            dispatch(basketCreated(content))
        } catch (error) {
            dispatch(createBasketFailed(error.message))
        }
    }
}
export const closeBasket = () => (dispatch) => {
    dispatch(hideBasket())
}
export const updateBasket = (data) => async (dispatch) => {
    dispatch(basketUpdateRequested())
    try {
        const { content } = await basketService.updateBasket(data)
        dispatch(basketUpdate(content))
    } catch (error) {
        dispatch(basketUpdateFailed())
    }
}
export const getChosenGoods = () => (state) => {
    let chosenGoods = {}
    if (state.basket.entities.goods) {
        for (const good of Object.values(state.basket.entities.goods)) {
            if (good.chosen) {
                chosenGoods = {
                    ...chosenGoods,
                    [good.goodId]: good
                }
            }
        }
    }
    return chosenGoods
}
export const removeChosenGoods = () => async (dispatch, getState) => {
    const currentBasket = getState().basket.entities
    console.log(currentBasket)
    let newBasket = { ...currentBasket }
    const chosenGoods = { ...currentBasket.goods }
    for (const good of Object.keys(chosenGoods)) {
        if (chosenGoods[good].chosen) {
            delete chosenGoods[good]
        }
    }
    console.log(chosenGoods)
    newBasket = {
        ...newBasket,
        goods: {
            ...chosenGoods
        }
    }
    console.log(newBasket)
    dispatch(updateBasket(newBasket))
}
export const getBasket = () => (state) => state.basket.entities

export default basketReducer
