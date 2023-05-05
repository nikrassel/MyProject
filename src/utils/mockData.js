import { useEffect, useState } from "react"
import basket from "../mockData/basket.json"
import categories from "../mockData/categories.json"
import goods from "../mockData/goods.json"
import orders from "../mockData/orders.json"
import httpService from "../services/http.service"

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    }
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(statusConsts.idle)
    const [progress, setProgress] = useState(0)
    const [count, setCount] = useState(0)
    const summaryCount =
        basket.length + categories.length + goods.length + orders.length
    function incrementCount() {
        setCount((prevState) => prevState + 1)
    }
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending)
        }
        const newProgress = Math.floor((count / summaryCount) * 100)
        if (progress < newProgress) {
            setProgress(() => newProgress)
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed)
        }
    }
    useEffect(() => {
        updateProgress()
    }, [count])
    async function initialize() {
        try {
            for (const good of basket) {
                await httpService.put("basket/" + good.goodId, good)
                incrementCount()
            }
            for (const category of categories) {
                await httpService.put(
                    "categories/" + category.categoryName,
                    category
                )
                incrementCount()
            }
            for (const good of goods) {
                await httpService.put("goods/" + good.id, good)
                incrementCount()
            }
            for (const order of orders) {
                await httpService.put("orders/" + order.orderNumber, order)
                incrementCount()
            }
        } catch (error) {
            setError(error)
            setStatus(statusConsts.error)
        }
    }
    return { error, initialize, progress, status }
}

export default useMockData
