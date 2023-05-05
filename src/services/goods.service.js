import httpService from "./http.service"

const goodsEndpoint = "goods/"

const goodsService = {
    get: async () => {
        const { data } = await httpService.get(goodsEndpoint)
        return data
    }
}

export default goodsService
