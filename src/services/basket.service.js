import httpService from "./http.service"
import localStorageService from "./localStorage.service"

const basketEndpoint = "basket/"

const basketService = {
    get: async () => {
        const { data } = await httpService.get(basketEndpoint)
        return data
    },
    getUserBasket: async () => {
        const { data } = await httpService.get(
            basketEndpoint + localStorageService.getUserId()
        )
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            basketEndpoint + payload.userId,
            payload
        )
        return data
    },
    updateBasket: async (payload) => {
        const { data } = await httpService.patch(
            basketEndpoint + localStorageService.getUserId(),
            payload
        )
        return data
    }
}

export default basketService
