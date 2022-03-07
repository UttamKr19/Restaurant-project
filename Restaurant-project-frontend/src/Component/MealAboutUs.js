import React from 'react'

export default function MealAboutUs() {
    const aboutStyle = {
        marginTop: "0px",
        textShadow: "2px 2px black",
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius: '20px',
        color: 'white',
    }
    return (
        <div className="container component" style={aboutStyle} >
            <p className='text-white text-center' style={{ fontSize: "30px", padding: "20px" }} >Food Bites is a restaurant web app, developed solely for learning purposes</p>
            <h3>Features:</h3>
            <h5>> User can create a new account (SignIn/SignUp).</h5>
            <h5>> User can explore food from different categories and order food. </h5>
            <h5>> User can provide anonymous feedbacks without logging into the website.</h5>
            <hr />
            <h3>Technologies used:</h3>
            <h5>> This single page web appication is based on <b>ReactJs</b> and Java's <b>Spring Boot Framework</b>.</h5>
            <h5>> It follows <b>Model-View-Controller</b> architecture, and communicates using <b>RestFul APIs</b>.</h5>
            <h5>> External API used: TheMealDB API, for the data related to meals. </h5>
            <h5>> Database- It uses <b>MySQL</b> to store user's account and orders information with the help of <b>Hibernate(ORM)</b> framework.</h5>
            <hr />
            <h3>Developer:</h3>
            <h5>Uttam Kumar 
                <span  style={{textShadow:"none", color:"black",padding:"20px"}}>
                    <a href="https://www.github.com/uttamkr19">GitHub</a> <a href="https://www.linkedin.com/in/this-is-uttam">LinkedIn</a>
                </span>
            </h5>
        </div>
    )
}
