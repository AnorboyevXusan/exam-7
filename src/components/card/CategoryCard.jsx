import {useEffect, useState} from "react";
import request from "../../server";

import "./category.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

// import { IMG } from "../../const";
import Slider from "react-slick";
import {NavLink} from "react-router-dom";
import {IMG} from "../../const";
import {$api} from "../../api/index.js";

const CategoryCard = () => {

    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/category')
            .then(res => {
                setResult(res.data)
            })
    }, [])

    let settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 2500,
        cssEase: "linear",
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 4, slidesToScroll: 3, infinite: true, dots: true,
            },
        }, {
            breakpoint: 850, settings: {
                slidesToShow: 3, slidesToScroll: 2, initialSlide: 1,
            },
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 2, slidesToScroll: 1,
            },
        },],
    }


    return (<div className="">
            <Slider {...settings} className="categories">
                {result?.map((card) => (<div key={card?.id} className="catecard">
                        <NavLink to={`/category/${card?.id}`}>
                            <div className="real-card">
                                <div className="img_category">
                                    <img
                                        src={card?.img?.full_url}
                                    />
                                </div>
                                <div className="category-text">
                                    <h3>{card.title}</h3>
                                    <p className="popular_text">{card.desc}</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>))}
            </Slider>
        </div>);
};

export default CategoryCard;
