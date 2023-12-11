import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "./style.scss";

import user from "../../../assets/user.png"
import {$api} from "../../../api/index.js";

const PostPage = () => {

    const {id} = useParams()


    const [result, setResult] = useState()
    useEffect(() => {
        $api
            .get(`/blogs?where[id]=${id}`)
            .then(res => {
                setResult(res.data?.[0])
            })
    }, [id])


    return (
        <section id="blog-post">
            <div className="container blog-post">
                <div className="post-content">
                    <img
                        className="post-image"
                        src={result?.img?.full_url}
                    />
                </div>
                <div className="container-md post-text">
                    <div className="user">
                        <img className="user-icon" src={user} alt=""/>
                        <div className="user-info">
                            <h5>{result?.name}</h5>
                        </div>
                    </div>
                    <h2>{result?.title}</h2>
                    <p>{result?.desc}</p>
                </div>
            </div>
        </section>
    );
};

export default PostPage;
