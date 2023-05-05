import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import MiddleNavBar from "../ui/middleNavBar"
import LowerNavBar from "../ui/lowerNavBar"
import { getGoodWithSearch } from "../../store/goods"
import { useSelector } from "react-redux"

const SearchResult = () => {
    const { request } = useParams()
    const navigate = useNavigate()
    const searchResults = useSelector(getGoodWithSearch(request))
    function handleClick(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${endPoint}`)
    }
    return (
        <>
            <MiddleNavBar />
            <LowerNavBar />
            {searchResults ? (
                <>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 mt-3 text-center"></div>
                    {searchResults.map((item) => (
                        <div className="col" key={item.id}>
                            <div
                                className="card mb-4"
                                style={{ width: "18rem" }}
                            >
                                <img src={item.img} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <a
                                            id={`${item.category}/${item.id}`}
                                            href=""
                                            onClick={handleClick}
                                        >
                                            {item.name}
                                        </a>
                                    </h5>
                                    <h4 className="card-title">
                                        {item.price} Р
                                    </h4>
                                    <p className="card-text">
                                        {item.shortDescription}
                                    </p>
                                    <a href="" className="btn btn-warning">
                                        Купить
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <h2>Извините ничего не найдено</h2>
            )}
        </>
    )
}

export default SearchResult
