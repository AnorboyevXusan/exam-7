import {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {Link, useParams} from "react-router-dom";
import {LIMIT} from "../../../const";


import "./style.scss";
import {$api} from "../../../api/index.js";

const CategoryPage = () => {
    const [result , setResult] = useState([])
    const [categorys ,setCategorys] =useState([])
    const [search , setSearch] = useState("")

    const [total , setTotal ] = useState(0)
    const [activePage , setActivePage] = useState(0)

    const {id} = useParams();


    useEffect(() => {
        $api
            .get(`category?where[id]=${id}`)
            .then(res => {
                setResult(res.data?.[0])
            })

        $api
            .get(`categoryItem?where[title][like]=${search?.toLowerCase()}`)
            .then(res => {
                setCategorys(res.data)
            })
    }, [id, search])

    const handlePageClick = ({selected}) => {
        setActivePage(selected + 1);
    };

    let pages = Math.ceil(total / LIMIT);
    let pagination =
        pages !== 1 ? (
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                pageRangeDisplayed={5}
                pageCount={pages}
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
            />
        ) : null;

    return (
        <Fragment>
            <section id="category" className="home-category">
                <div className="container category-page">
                    <h1>{result?.title}</h1>
                    <p>{result?.desc}</p>
                    <div className="breadcrumb">
                        <Link to="/">Home</Link>
                        <p>&#62;</p>
                        <Link to={`/category/${id}`}>{result?.title}</Link>
                    </div>
                </div>
            </section>
            <section className="all-posts">
                <div className="container">
                    <div className="container all-posts__container">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            type="text"
                            placeholder="Searching..."
                        />
                    </div>
                    <div className="posts-row">
                        {categorys?.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-image">
                                    <img
                                        src={post.img.full_url}
                                        alt=""
                                    />
                                </div>
                                <div className="post-info">
                                    <p className="post-category">{post.category.title}</p>
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-p">
                                        {post?.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {pagination}
                </div>
            </section>
        </Fragment>
    );
};


export default CategoryPage;