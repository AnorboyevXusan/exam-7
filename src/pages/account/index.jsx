import {useNavigate} from "react-router-dom";
import "./style.scss";

const AccountPage = () => {

  const localMe = localStorage.getItem('me')
  const me = JSON?.parse(localMe)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('me')
    navigate("/")

    window.location.reload()
  }
  

  return (
    <section id="account-form">
      <div className="container account">
        <div className="title-account">
          <h1 className="login__title">Account</h1>
          {/*<NavLink className="account-btncha" to="/account/edit" >Edit Data</NavLink>*/}
        </div>
        <div className="account-info">
          <div>
            <button className="account-btn" onClick={logout}>
              Logout
            </button>
          </div>
          <div className="account-text">
            <h3>
              First Name: <span>{me?.firstName}</span>
            </h3>
            <h3>
              Last Name: <span>{me?.lastName}</span>
            </h3>
            <h3 style={{marginBottom: '2rem'}}>
              Username: <span>{me?.userName}</span>
            </h3>
            {/*<h3>*/}
            {/*  Phone Number: <span>{me?.phoneNumber}</span>*/}
            {/*</h3>*/}
            {/*<h3>*/}
            {/*  Birthday Date: <span>{me?.birthday?.split('T')[0]}</span>*/}
            {/*</h3>*/}
            {/*<h3>*/}
            {/*  Address: <span>{me?.address}</span>*/}
            {/*</h3>*/}
            {/*<h3>*/}
            {/*  Email: <span>{me?.email}</span>*/}
            {/*</h3>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
