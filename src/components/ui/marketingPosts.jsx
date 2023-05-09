import React from "react"

const MarketingPosts = () => {
    return (
        <div className="container mt-5">
            <div className="row align-items-start">
                <div className="col p-2">
                    <img src="img\marketingbanner1.jpg" alt="" width="300px" style={{ borderRadius: "15%" }}/>
                </div>
                <div className="col p-2">
                    <img src="img\marketingbanner2.jpg" alt="" width="300px" style={{ borderRadius: "15%" }}/>
                </div>
                <div className="col p-2">
                    <img src="img\marketingbanner3.jpg" alt="" width="300px" style={{ borderRadius: "15%" }}/>
                </div>
                <div className="col p-2">
                    <img src="img\marketingbanner4.jpg" alt="" width="300px" style={{ borderRadius: "15%" }}/>
                </div>
            </div>
        </div>
    )
}

export default MarketingPosts
