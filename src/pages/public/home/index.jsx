import {memo, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import CategoryCard from "../../../components/card/CategoryCard";
import PopularCard from "../../../components/card/PopularCard";
import "./style.scss";
import {$api} from "../../../api/index.js";

const HomePage = () => {

    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/main')
            .then(res => {
                setResult(res.data?.[0])
            })
    }, [])


    return (<main>
        <section
            id="latest"
            style={{
                background: `url(${result?.img?.full_url}) no-repeat center`,
            }}
        >
            <div className="container">
                <div className="latest-text">
                    <h5>
                        Posted on <span>{result?.category?.name}</span>{" "}
                    </h5>
                    <h1>{result.title}</h1>
                    <div>
                        <h6>
                            By{" "}<span>{result?.name}</span>
                        </h6>
                        <p>{result.desc}</p>
                        <NavLink
                            className="lastone-btn"
                            to={`/post/${result.id}`}
                        >
                            Read More{" "}
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
        <section id="popular">
            <div className="container">
                <h2>Popular blogs</h2>
                <PopularCard/>
                <hr/>
            </div>
        </section>
        <section id="category">
            <div className="container">
                <h2>Choose A Catagory</h2>
                <CategoryCard/>
            </div>
        </section>
    </main>);
};

const MemoHomePage = memo(HomePage);

export default MemoHomePage;
