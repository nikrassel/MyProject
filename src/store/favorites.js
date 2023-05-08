import { createAction, createSlice } from "@reduxjs/toolkit"
import favoritesService from "../services/favorites.service"
import isOutdated from "../utils/dateChecker"

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        favoritesRequested: (state) => {
            state.isLoading = true
        },
        favoritesReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        favoritesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        hideFavorites: (state) => {
            state.entities = null
        },
        favoritesUpdate: (state, action) => {
            state.entities = action.payload
        },
        favoritesCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        }
    }
})

const { reducer: favoritesReducer, actions } = favoritesSlice
const {
    favoritesCreated,
    favoritesRequested,
    favoritesReceved,
    favoritesRequestFailed,
    hideFavorites,
    favoritesUpdate
} = actions
const favoritesCreateRequest = createAction("favorites/createRequested")
const createFavoritesFailed = createAction("favorites/createFailed")
const favoritesUpdateRequested = createAction("favorites/updateRequested")
const favoritesUpdateFailed = createAction("favorites/updateFailed")
export function createFavorites(payload) {
    return async function(dispatch) {
        dispatch(favoritesCreateRequest())
        try {
            const { content } = await favoritesService.create(payload)
            dispatch(favoritesCreated(content))
        } catch (error) {
            dispatch(createFavoritesFailed())
        }
    }
}
export const loadUserFavorites = () => async (dispatch, getState) => {
    const { lastFetch } = getState().favorites
    if (isOutdated(lastFetch)) {
        dispatch(favoritesRequested())
        try {
            const { content } = await favoritesService.getUserFavorites()
            dispatch(favoritesReceved(content))
        } catch (error) {
            dispatch(favoritesRequestFailed())
        }
    }
}
export const refreshFavorites = () => (dispatch) => {
    dispatch(hideFavorites())
}
export const updateFavorites = (data) => async (dispatch) => {
    dispatch(favoritesUpdateRequested())
    try {
        const { content } = await favoritesService.updateFavorites(data)
        dispatch(favoritesUpdate(content))
    } catch (error) {
        dispatch(favoritesUpdateFailed())
    }
}

export const getFavorites = () => (state) => state.favorites.entities
export default favoritesReducer
