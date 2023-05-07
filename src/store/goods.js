import { createSlice } from "@reduxjs/toolkit"
import goodsService from "../services/goods.service"
import isOutdated from "../utils/dateChecker"
import randomInt from "../utils/randomInt"

const goodsSlice = createSlice({
    name: "goods",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        goodsRequested: (state) => {
            state.isLoading = true
        },
        goodsReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        goodsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: goodsReducer, actions } = goodsSlice
const { goodsRequested, goodsReceved, goodsRequestFailed } = actions

export const loadGoodsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().goods
    if (isOutdated(lastFetch)) {
        dispatch(goodsRequested())
        try {
            const { content } = await goodsService.get()
            dispatch(goodsReceved(content))
        } catch (error) {
            dispatch(goodsRequestFailed(error.message))
        }
    }
}
export const getGoodsByCategory = (categoryName) => (state) => {
    if (state.goods.entities) {
        const categoryGoods = []
        for (const good of state.goods.entities) {
            if (good.category === categoryName) {
                categoryGoods.push(good)
            }
        }
        return categoryGoods
    }
    return []
}
export const getGoodById = (goodId) => (state) => {
    let chosenGood
    if (state.goods.entities) {
        for (const good of state.goods.entities) {
            if (good.id === goodId) {
                chosenGood = good
            }
        }
    }
    return chosenGood
}
export const getGoodWithSearch = (goodName) => (state) => {
    if (state.goods.entities) {
        return state.goods.entities.filter((elem) =>
            elem.name.toLowerCase().includes(goodName.toLowerCase())
        )
    }
    return null
}
export const getBasketGoods = (basket) => (state) => {
    if (state.goods.entities) {
        const goodsArray = []
        for (const chosenGood of basket) {
            for (const good of state.goods.entities) {
                if (good.id === chosenGood.goodId) {
                    goodsArray.push(good)
                    break
                }
            }
        }
        return goodsArray
    }
    return []
}
export const getRecommendation = (goodId) => (state) => {
    if (state.goods.entities) {
        const filtredGoods = state.goods.entities.filter(
            (elem) => elem.id !== goodId
        )
        return filtredGoods[randomInt(0, filtredGoods.length)]
    }
    return null
}

export const getGoods = () => (state) => state.goods.entities

export default goodsReducer
