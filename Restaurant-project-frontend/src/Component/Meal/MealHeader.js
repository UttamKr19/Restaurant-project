import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUserToken,getUserToken } from '../UseToken';
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"><img style={{ height: '30px' }} src="..\foodbites_logo.png" alt="logo"></img></Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/categories">Categories <span className="sr-only">(current)</span></Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/feedback">Feedback <span className="sr-only">(current)</span></Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>

                    </ul>
                    <form className="my-2 my-lg-0 text-center">
                        {userToken.isLoggedIn ?
                            <>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home" onClick={logoutHandler}>Log out</Link>
                                    </li>
                                </ul>
                            </> :
                            <>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/register">Sign Up</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/login"><b>Log in</b></Link>
                                    </li>
                                </ul>
                            </>
                        }
                    </form>
                </div>
            </nav>
        </div>
    )
}
