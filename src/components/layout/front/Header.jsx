import {NavLink} from "react-router-dom";
import "./Header.scss";
import logo from "../../../assets/header/Logo.svg";

const Header = () => {

  const localMe = localStorage.getItem('me')
  const me = JSON?.parse(localMe)


  return (
    <header>
      <div className="container navbar">
        <div className="logo">
          {me ? (
            <NavLink className="logo" to="/my-posts">
              My Posts
            </NavLink>
          ) : (
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          )}
        </div>
        <div className="nav-links">
          <div className="nav-link">
            <NavLink className="link" to="/">Home</NavLink>
            <NavLink className="link" to="/blog">Blog</NavLink>
            <NavLink className="link" to="/about">About</NavLink>
            <NavLink className="link" to="/register">Register</NavLink>
          </div>
          {me ? (
            <NavLink className="nav-btn" to="/account">Account</NavLink>
          ) : (
            <NavLink className="nav-btn" to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
