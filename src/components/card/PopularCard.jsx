import {useEffect, useState} from "react";

import "./popular.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import Slider from "react-slick";
import {NavLink} from "react-router-dom";
import {$api} from "../../api/index.js";

const PopularCard = () => {

    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/blogs')
            .then(res => {
                setResult(res.data)
            })
    }, [])


    let settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true,
            },
        }, {
            breakpoint: 800, settings: {
                slidesToShow: 2, slidesToScroll: 2, initialSlide: 2,
            },
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 1, slidesToScroll: 1,
            },
        },],
    }


    return (<div>
            <Slider {...settings}>
                {result?.map((card) => (<NavLink to={`/post/${card?.id}`} key={card?.id} className="card">
                        <div className="img_container">
                            <img
                                src={card?.img?.full_url}
                            />
                        </div>
                        <div className="popular-text">
                            <p>By <span>{card?.name}</span></p>
                            <h2>{card?.title}</h2>
                            <p className="popular_text">{card?.desc}</p>
                        </div>
                    </NavLink>))}
            </Slider>
        </div>);
};

export default PopularCard;
