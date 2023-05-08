import httpService from "./http.service"
import localStorageService from "./localStorage.service"

const ordersEndpoint = "orders/"

const ordersService = {
    get: async () => {
        const { data } = await httpService.get(ordersEndpoint)
        return data
    },
    getUserOrders: async () => {
        const { data } = await httpService.get(
            ordersEndpoint + localStorageService.getUserId()
        )
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            ordersEndpoint +
                localStorageService.getUserId() +
                "/" +
                payload.orderNumber,
            payload
        )
        return data
    }
}

export default ordersService
