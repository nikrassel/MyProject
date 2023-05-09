import React from "react"
import { useNavigate, useParams } from "react-router-dom"
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
        <div className="mb-4 offset-md-1">
            {searchResults ? (
                <>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 mt-3 text-center">
                        {searchResults.map((item) => (
                            <div className="col" key={item.id}>
                                <div
                                    className="card text-center mb-4"
                                    style={{ width: "18rem" }}
                                >
                                    <img src={item.img} className="card-img-top" type="button" onClick={handleClick} id={`${item.category}/${item.id}`}/>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <p
                                                id={`${item.category}/${item.id}`}
                                                onClick={handleClick}
                                                type="button"
                                            >
                                                {item.name}
                                            </p>
                                        </h5>
                                        <h4
                                            className="card-title"
                                            onClick={handleClick}
                                            id={`${item.category}/${item.id}`}
                                            type="button">
                                            {item.price} Р
                                        </h4>
                                        <p
                                            className="card-text"
                                            onClick={handleClick}
                                            id={`${item.category}/${item.id}`}
                                            type="button">
                                            {item.shortDescription}
                                        </p>
                                        <a href="" className="btn btn-warning">
                                            Купить
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2>Извините ничего не найдено</h2>
            )}
        </div>
    )
}

export default SearchResult
