import React from "react"
import { Route, Routes } from "react-router-dom"
import UpperNavBar from "./components/ui/upperNavBar"
import Main from "./components/page/main"
import Login from "./components/page/login"
import SupportInfo from "./components/ui/supportInfo"
import Catalog from "./components/page/catalog"
import NotFound from "./components/page/not-found"
import UserBasket from "./components/page/userBasket"
import CheckOut from "./components/page/checkOut"
import UserOrders from "./components/page/userOrders"
import SearchResult from "./components/page/searchResult"
import UserCabinet from "./components/page/userCabinet"

function App() {
    return (
        <>
            <UpperNavBar />
            <Routes>
                <Route path="/" Component={Main} />
                <Route path="/catalog/:category?/:good?" Component={Catalog} />
                <Route path="/login/:type?" Component={Login} />
                <Route path="/basket" Component={UserBasket} />
                <Route path="/checkout" Component={CheckOut} />
                <Route path="/orders/:number?" Component={UserOrders} />
                <Route path="/search/:request?" Component={SearchResult} />
                <Route path="/cabinet" Component={UserCabinet} />
                <Route path="*" Component={NotFound} />
            </Routes>
            <SupportInfo />
        </>
    )
}

export default App
