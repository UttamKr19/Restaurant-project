import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SERVER_API_BASE_URL from '../api/ServerApi';
import './meal-home.css';
import MealOrder from './MealOrder';
export default function MealHome() {

    const [displayContent, setDisplayContent] = useState('meal');

    useEffect(() => {
        let url = SERVER_API_BASE_URL
        axios.get(url).then((res) => {
            console.log("testing backend server")
        }).catch(error => { console.log(error) })

    }, [])


    if (displayContent === 'order') {
        return <MealOrder />
    }

    return (
        <div id="meal-home" className='component'>

            <div className=" h-100 d-flex justify-content-center home-content">
                <div className="">
                    <h1 className="text-center text-white" >Welcome to <span className='food-bites-text' style={{ fontSize: "65px", color: "green", textShadow: "1px 2px yellow" }}>Food Bites</span> </h1>

                    <div className="home-texts text-center text-white">
                        <h4>We serve the best food for our lovely customers</h4>
                    </div>
                    <br/><hr/>
                    <div className="d-flex justify-content-center explore-button">
                        <Link to="/categories"><button className='btn btn-outline-danger'>Let's Explore</button></Link>
                    </div>

                </div>
            </div>
            {/* <div className='component d-flex justify-content-center align-items-center' style={{ fontFamily: "cursive" }} id="meal-home">

                <div className='vh-100 justify-content-center align-items-center' >
                    <h1 className="text-center text-white" >Welcome to <span className='food-bites-text' style={{ fontSize: "65px", color: "green", textShadow: "1px 2px yellow" }}>Food Bites</span> </h1>

                    <div className="home-texts text-center text-white">
                        <h4>We serve the best food for our lovely customers</h4>
                    </div>
                </div>


            </div>
            <div className='explore-button text-center '>
                <Link to="/categories"><button className='btn btn-outline-danger'>Let's Explore</button></Link>
            </div> */}
        </div>

    )
}
