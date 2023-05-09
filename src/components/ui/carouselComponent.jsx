import React from "react"

const CarouselComponent = () => {
    return (
        <div
            id="carouselExampleControls"
            className="carousel slide d-block w-50 container-fluid"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="img\carousel1.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{ borderRadius: "5%" }}
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="img\carousel2.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{ borderRadius: "5%" }}
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="img\carousel3.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{ borderRadius: "5%" }}
                    />
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default CarouselComponent
