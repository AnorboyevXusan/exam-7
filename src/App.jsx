import {useContext} from "react";
import {BrowserRouter, Navigate, Route, Routes,} from "react-router-dom";
import FrontLayout from "./components/layout/front";
import {AuthContext} from "./context/AuthContext";
import AccountPage from "./pages/account";
import AccountEdit from "./pages/account/accountEdit";
import DashboardPage from "./pages/admin/dashboard";
import AboutPage from "./pages/public/about";
import BlogPage from "./pages/public/blog";
import CategoryPage from "./pages/public/category";
import HomePage from "./pages/public/home";
import LoginPage from "./pages/public/login";
import NotFoundPage from "./pages/public/not-found";
import PostPage from "./pages/public/post";
import RegisterPage from "./pages/public/register";
import MyPostsPage from "./pages/user/my-posts/my-blog";

// import MyPostsPage from "./pages/user/my-posts";

function App() {

    const localMe = localStorage.getItem('me')
    const me = JSON?.parse(localMe)

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<FrontLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/category/:id" element={<CategoryPage/>}/>
                    <Route path="/blog" element={<BlogPage/>}/>
                    <Route path="/post/:id" element={<PostPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route
                        path="/my-posts"
                        element={
                            me ? <MyPostsPage/> : <Navigate to="/login"/>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            me ? <AccountPage/> : <Navigate to="/login"/>
                        }
                    />
                    <Route
                        path="/account/edit"
                        element={
                            me ? <AccountEdit/> : <Navigate to="/login"/>
                        }
                    />
                </Route>

                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
