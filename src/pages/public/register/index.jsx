import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./style.scss";
import {toast} from "react-toastify";
import {$api} from "../../../api/index.js";

const RegisterPage = () => {

    const localMe = localStorage.getItem('me')
    const me = JSON?.parse(localMe)

    const navigate = useNavigate()


    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const register = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('firstName', fName)
        formData.append('lastName', lName)
        formData.append('userName', userName)
        formData.append('password', password)

        if (password === password2) {
            $api
                .post(`/users`, formData, {
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded',
                        "Authorization": 'Bearer Tad216tIaccvhAKVAd5TYssnZqM63IUBVwNiHFUM'
                    }
                })
                .then(res => {
                    toast.success('Success!')

                    localStorage.setItem('me', JSON?.stringify(res.data?.[0]))

                    navigate('/my-posts')

                    window.location.reload()
                })
                .catch(err => {
                    toast.error(err?.response?.data?.message)
                })

        } else {
            toast.error('Parollar bir biriga togri kelmayotur !')
        }
    }


    useEffect(() => {
        me && navigate('/my-posts')
    }, [me, navigate])


    return (
        <section id="login-form">
            <div className="container">
                <h1 className="login__title">Register</h1>
                <form
                    autoComplete="off"
                    onSubmit={register}
                    className="login-inputs"
                >
                    <input
                        onChange={(e) => setFName(e.target.value)}
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        className="login-input"
                    />
                    <input
                        onChange={(e)=>setLName(e.target.value)}
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        className="login-input"
                    />
                    <input
                        onChange={(e)=>setUserName(e.target.value)}
                        required
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="login-input"
                    />
                    <input
                        onChange={(e)=>setPassword2(e.target.value)}
                        required
                        name="confirm"
                        type="password"
                        placeholder="Confirm"
                        className="login-input"
                    />
                    <input className="login-btn" type="submit" value="Register" onClick={() => {
                    }}/>
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;
