import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './routing.css';
import { deleteUserToken, getUserToken } from './UseToken';
import swal from 'sweetalert';


export default function MealHeader() {

    const [userToken, setUserToken] = useState({
        username: '',
        isLoggedIn: false
    });

    useEffect(() => {
        const token = getUserToken()
        if (token) {
            setUserToken({
                username: token.username,
                isLoggedIn: true
            })
        }
    }, []);

    const logoutHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once logged out, you will not be able to order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteUserToken()
                window.location.reload()
                swal("Logged out successfully!", {
                icon: "success",
              });
            }
          });
    }

    return (
        <div className="routing">
            <ul style={{ fontSize: '20px' }}>
                <li><Link to="/"><img style={{ height: '30px' }} src="..\foodbites_logo.png" alt="logo"></img></Link></li>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/categories">Categories</Link> </li>
                <li> <Link to="/feedback">Feedback</Link> </li>
                <li> <Link to="/about">About</Link> </li>
                <li style={{ float: "right", fontSize: "16px" }}>
                    {userToken.isLoggedIn ?
                        <><Link to="/dashboard">Welcome {userToken.username}</Link><Link to="/home" style={{ color: 'gainsboro' }} onClick={logoutHandler} >Logout</Link></>
                        : <><Link to="/register">Sign Up</Link><Link to="/login" >Login</Link></>}
                </li>
            </ul>
        </div>
    )
}
