import httpService from "./http.service"
import localStorageService from "./localStorage.service"

const favoritesEndpoint = "favorites/"

const favoritesService = {
    getUserFavorites: async () => {
        const { data } = await httpService.get(
            favoritesEndpoint + localStorageService.getUserId()
        )
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            favoritesEndpoint + payload.userId,
            payload
        )
        return data
    },
    updateFavorites: async (payload) => {
        const { data } = await httpService.patch(
            favoritesEndpoint + localStorageService.getUserId(),
            payload
        )
        return data
    }
}

export default favoritesService
