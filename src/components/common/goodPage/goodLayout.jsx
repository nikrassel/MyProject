import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getGoodById, getRecommendation } from "../../../store/goods"

const GoodLayout = () => {
    const { good } = useParams()
    const navigate = useNavigate()
    const currentGood = useSelector(getGoodById(good))
    const recommendation = useSelector(getRecommendation(good))
    function handleReccomendation(target) {
        const endPoint = target.target.id
        navigate(`/catalog/${recommendation.category}/${endPoint}`)
    }
    if (currentGood) {
        return (
            <>
                <h2>{currentGood.name}</h2>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <img src={currentGood.img} width="300 px" />
                        </div>
                        <div className="col-md-4">
                            <div className="mb-2">
                                <span>
                                    <strong>{currentGood.price} Р </strong>
                                </span>
                                <span>Вы получите х бонусов</span>
                            </div>
                            <button className="btn btn-warning mb-2">
                                Купить
                            </button>
                            <br />
                            <button className="btn btn-info">
                                В избранное
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <p>{currentGood.fullDescription}</p>
                    </div>
                    {recommendation && (
                        <div className="col-md-4">
                            <h4>Рекомендуем Вам</h4>
                            <div className="card" style={{ width: "14rem" }}>
                                <img
                                    src={recommendation.img}
                                    className="card-img-top"
                                    width="100 px"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h6
                                        className="card-title"
                                        role="button"
                                        id={recommendation.id}
                                        onClick={handleReccomendation}
                                    >
                                        {recommendation.name}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <h2>Page not found</h2>
            </>
        )
    }
}

export default GoodLayout
