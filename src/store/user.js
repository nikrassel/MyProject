import userService from "../services/user.service"
import authService from "../services/auth.service"
import localStorageService from "../services/localStorage.service"
import { createAction, createSlice } from "@reduxjs/toolkit"
import { createBasket, closeBasket } from "./basket"
import { generateAuthError } from "../utils/generateAuthError"
import { refreshOrders } from "./orders"

const initialState = localStorageService.getAccesToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: localStorageService.getUserId(),
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    }

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        userInfoRequested: (state) => {
            state.isLoading = true
        },
        userInfoReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        userInfoRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: userReducer, actions } = usersSlice
const { authRequestSuccess, userCreated, authRequestFailed, userLoggedOut, userInfoRequested, userInfoReceved, userInfoRequestFailed } =
    actions
const authRequested = createAction("users/authRequested")
const userCreateRequested = createAction("users/userCreateRequested")
const createUserFailed = createAction("users/createUserFailed")

function createUser(payload) {
    return async function(dispatch) {
        dispatch(userCreateRequested())
        try {
            const { content } = await userService.create(payload)
            dispatch(userCreated(content))
        } catch (error) {
            dispatch(createUserFailed(error.message))
        }
    }
}
export const signUp =
    ({ email, password, ...rest }) =>
        async (dispatch) => {
            dispatch(authRequested())
            try {
                const data = await authService.register({ email, password })
                localStorageService.setTokens(data)
                dispatch(authRequestSuccess({ userId: data.localId }))
                dispatch(
                    createUser({
                        id: data.localId,
                        email,
                        image: `https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`,
                        ...rest
                    })
                )
                dispatch(
                    createBasket({
                        userId: data.localId,
                        goods: []
                    })
                )
            } catch (error) {
                dispatch(authRequestFailed(error.message))
            }
        }
export const login = (payload) => async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({ email, password })
        dispatch(authRequestSuccess(data.localId))
        localStorageService.setTokens(data)
    } catch (error) {
        const { code, message } = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
}
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    dispatch(closeBasket())
    dispatch(refreshOrders())
}
export const loadUserInfo = () => async (dispatch) => {
    dispatch(userInfoRequested())
    try {
        const { content } = await userService.getCurrentUser()
        dispatch(userInfoReceved(content))
    } catch (error) {
        dispatch(userInfoRequestFailed(error.message))
    }
}
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getUserInfo = () => (state) => state.user.entities

export default userReducer
