import httpService from "./http.service"

const basketEndpoint = "basket/"

const basketService = {
    get: async () => {
        const { data } = await httpService.get(basketEndpoint)
        return data
    }
}

export default basketService
