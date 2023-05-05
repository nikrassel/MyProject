import { createSlice } from "@reduxjs/toolkit"
import categoriesService from "../services/categories.service"
import isOutdated from "../utils/dateChecker"

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: categoriesReducer, actions } = categoriesSlice
const { categoriesRequested, categoriesReceved, categoriesRequestFailed } =
    actions

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested())
        try {
            const { content } = await categoriesService.get()
            dispatch(categoriesReceved(content))
        } catch (error) {
            dispatch(categoriesRequestFailed(error.message))
        }
    }
}
export const getCategoryByName = (categoryName) => (state) => {
    let chosenCategory
    if (state.categories.entities) {
        for (const category of state.categories.entities) {
            if (category.categoryName === categoryName) {
                chosenCategory = category.categoryName
                break
            }
        }
    }
    return chosenCategory
}

export const getCategories = () => (state) => state.categories.entities

export default categoriesReducer
