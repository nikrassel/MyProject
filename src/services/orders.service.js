import httpService from "./http.service"

const ordersEndpoint = "orders/"

const ordersService = {
    get: async () => {
        const { data } = await httpService.get(ordersEndpoint)
        return data
    }
}

export default ordersService
