import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import SERVER_API_BASE_URL from '../../api/ServerApi';
import MealHome from '../Meal/MealHome';
import { getUserToken, saveUserToken } from '../UseToken';
import '../../App.css';
import GuestLogin from '../GuestLogin';


export default function Login(props) {

    const [userToken, setUserToken] = useState({
        username: '',
        isLoggedIn: false
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const token = getUserToken()
        if (token) {
            setUserToken({
                username: token.username,
                isLoggedIn: true
            })
        }
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();

        var session_url = SERVER_API_BASE_URL + '/user/login'
        var basicAuth = 'Basic ' + btoa(username + ':' + password);

        axios.post(session_url, { username: username, password: password }, {
            headers: {
                "Authorization": + basicAuth,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Content-Type": "application/json",
                "Crossorigin": "true",
                "Access-Control-Allow-Credentials": "true"
            }
        }).then((res) => {
            if (res.status === 202) {
                let userToken = { 'username': username, 'isLoggedIn': true };
                saveUserToken(userToken)
                setUserToken({
                    username: username,
                    isLoggedIn: true
                })
                window.location.reload()
                // history.push("/profile")  //doesn't update the header
            }
            else if (res.status === 204) {
                swal('wrong credentials', 'please try again', 'warning');
            }
            else {
                swal('wrong credentials', 'please try again', 'error');
            }

        }).catch(error => {
            if (error.response.status === 406) {
                swal('wrong credentials', 'please try again', 'warning');
            }
            else {
                swal('something went wrong !!', 'Try Again', 'error'); //400
            }
        })

    }

    if (userToken.isLoggedIn) {
        return <MealHome />
    }

    const loginStyle = {
        padding: '10px 20px 0px 20px',
        maxWidth: '500px',
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius: '20px',
        color: 'white',
        fontSize: '20px',
        textShadow: '2px 1px black'
    }

    return (
        <div className="container component" >
            <form className="form-signin" onSubmit={onSubmit} style={loginStyle}>
                <h2 className="form-signin-heading text-center ">Sign in</h2>
                <div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="username"
                        name="username" className="form-control"
                        placeholder="Username" required
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password"
                        name="password" className="form-control"
                        placeholder="Password" required
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <hr />
                    <div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </div>
                    <GuestLogin/>
                    <hr />
                </div>
            </form>
        </div>
    )
}
