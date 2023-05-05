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
