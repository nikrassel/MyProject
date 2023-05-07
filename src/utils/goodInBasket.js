export function getGoodName(id, arrayOfGoods) {
    const goodName = arrayOfGoods.find((elem) => elem.id === id)
    return goodName.name
}
export function getGoodImage(id, arrayOfGoods) {
    const goodName = arrayOfGoods.find((elem) => elem.id === id)
    return goodName.img
}
export function getGoodPrice(id, arrayOfGoods) {
    const goodName = arrayOfGoods.find((elem) => elem.id === id)
    return goodName.price
}
export function goodCheck(id, basket) {
    if (Object.keys(basket).includes(id)) {
        return {
            [id]: {
                goodId: id,
                goodQuantity: basket[id].goodQuantity + 1,
                chosen: false
            }
        }
    } else {
        return {
            [id]: {
                goodId: id,
                goodQuantity: 1,
                chosen: false
            }
        }
    }
}
