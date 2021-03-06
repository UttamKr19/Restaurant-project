import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SERVER_API_BASE_URL from '../../api/ServerApi';
import '../../App.css';

export default function MealHome() {

   
    useEffect(() => {
        if (!localStorage.getItem('isBackendUp')) {
            let url = SERVER_API_BASE_URL
            axios.get(url).then((res) => {
                // console.log("testing backend server")
                localStorage.setItem('isBackendUp',true)
            }).catch(error => { console.log(error) })
        }
    }, [])

    return (
        <div id="meal-home" className='component'>

            <div className=" h-100 d-flex justify-content-center home-content">
                <div>
                    <h1 className="text-center text-white" >Welcome to <span className='food-bites-text' style={{ fontSize: "65px", color: "green", textShadow: "1px 2px yellow" }}>Food Bites</span> </h1>

                    <div className="home-texts text-center text-white">
                        <h4>We serve the best food for our lovely customers</h4>
                    </div>
                    <br /><hr />
                    <div className="d-flex justify-content-center explore-button">
                        <Link to="/categories"><button className='btn btn-outline-danger'>Let's Explore</button></Link>
                    </div>

                </div>
            </div>
        </div>

    )
}
