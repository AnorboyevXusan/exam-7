import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "./style.scss";
import {$api} from "../../../api/index.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const localMe = localStorage.getItem('me')
    const me = JSON?.parse(localMe)

    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const logIn = (psw) => {
        if (psw === password) {
            toast.success('Success')

            localStorage.setItem('token', `${'###'}`)

            $api
                .get(`users?where[userName]=${encodeURIComponent(userName)}`, {
                    headers: {Auth: localStorage.getItem('token')}
                })
                .then(res => {
                    localStorage.setItem('me', JSON?.stringify(res.data?.[0]))

                    window.location.reload()
                })

            navigate('/my-posts')
        } else {
            toast.error('Password error!')
        }
    }
    const afterLogin = (e) => {
        e.preventDefault()

        $api
            .get(`users?where[userName]=${encodeURIComponent(userName)}`)
            .then(res => {
                logIn(res.data?.[0]?.password)
            })
    }


    useEffect(() => {
        me && navigate('/my-posts')
    }, [me, navigate])


    return (
        <section id="login">
            <div className="container">
                <form className="login-form" onSubmit={afterLogin}>
                    <h1>Login</h1>
                    <div className="login-inputs">
                        <input
                            className="login-input"
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="off"
                            name="username"
                            type="text"
                            placeholder="Username"
                        />
                        <input
                            className="login-input"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <input className="login-btn" type="submit" value="login"/>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
