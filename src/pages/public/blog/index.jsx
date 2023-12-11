import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {NavLink} from "react-router-dom";
import {LIMIT} from "../../../const";
import "./style.scss";
import {$api} from "../../../api/index.js";

const PostsPage = () => {


    const [search, setSearch] = useState("");
    const [activePage, setActivePage] = useState(1);

    const [result, setResult] = useState([]);
    useEffect(() => {
        $api
            .get(`/blogs?where[title][like]=${search?.toLowerCase()}`)
            .then(res => {
                setResult(res.data)
            })
    }, [activePage, search])

    const handlePageClick = ({selected}) => {
        setActivePage(selected + 1);
    };

    let pages = Math.ceil(result / LIMIT);
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
        ) : null


    return (
        <section id="posts">
            <div className="container">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="text"
                    placeholder="Searching..."
                />
                <h1>All posts</h1>
                <hr className="hr"/>
                <div className="posts-row">
                    {result?.map((posts) => (
                        <NavLink to={`/post/${posts?.id}`} key={posts?.id} className="post-card">
                            <div className="post-image">
                                <img src={posts?.img?.full_url} alt={'nmadr'}/>
                            </div>
                            <div className="blogcha">
                                <h5>{posts?.name}</h5>
                                <h3>{posts?.title}</h3>
                                <p>{posts?.desc}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
                {pagination}
            </div>
        </section>
    );
};

export default PostsPage;