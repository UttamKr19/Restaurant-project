import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import swal from 'sweetalert';
import MEALDB_API_BASE_URL from '../api/MealDbServiceApi';
import SERVER_API_BASE_URL from '../api/ServerApi';
import { getUserToken } from './UseToken';

export default function MealOrder(props) {
    const history = useHistory()
    const location = useLocation()
    const [userToken, setUserToken] = useState({
        username: '',
        isLoggedIn: false
    })

    const [meal, setMeal] = useState()
    console.log(meal)
    const [order, setOrder] = useState({
        orderNo: '',
        mealId: '',
        item: undefined,
        category: undefined,
        quantity: 1,
        price: '',
        user: ''
    })

    useEffect(

        () => {
            let isMounted = true;

            const token = getUserToken()
            if (token) {
                setUserToken({
                    username: token.username,
                    isLoggedIn: true
                })
            }

            if (location.state) {

                axios.get(MEALDB_API_BASE_URL + '/lookup.php?i=' + location.state.idMeal)
                    .then((res) => {
                        let resItem = res.data.meals[0]
                        setMeal(resItem)
                        setOrder({
                            ...order,
                            item: resItem.strMeal,
                            category: resItem.strCategory,
                            price: Math.floor(Math.random() * 1000),
                            mealId: resItem.idMeal
                        })
                        console.log(resItem)
                    }).catch(error => { console.log(error) })
            }

            return () => { isMounted = false };
        }, [])


    const placeOrder = (e) => {
        e.preventDefault();

        if (userToken.isLoggedIn === false) {
            swal('You are not logged in', 'You need to log in for ordering food', 'info');
        }
        else {
            let id = new Date().valueOf();
            let newOrder = {
                orderNo: id,
                item: order.item,
                category: order.category,
                quantity: order.quantity,
                price: order.price,
                mealId: order.mealId,
                user: { email: userToken.username }
            }

            let url = SERVER_API_BASE_URL + '/user/order/add'

            axios.post(url, newOrder).then((res) => {
                swal('Order Placed', 'Congrats', 'success');
            }).catch(error => {
                console.log(error)
                swal('Oops!! something went wrong', 'Please try again', 'error');
            })
        }
    }


    if (location.state == null) {
        history.push("/categories")
    }

    const orderStyle = {
        padding: '10px 20px 0px 20px',
        // maxWidth: '600px',  
        // margin: 'auto',
        // marginTop: '20px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius: '20px',
        color: 'white',
        fontSize: '20px',
        textShadow: '2px 1px black'
    }
    return (
        <div className='component' >
            <div className="row">
                <div className="col-sm-6">
                    <div className="card" style={orderStyle}>
                        <div className="card-body text-center">
                            <img src={meal?.strMealThumb} className="card-img-top" alt="meal-item-pic" style={{ maxWidth: "400px" }} />
                        </div>
                        <label>Instructions</label>
                        <p style={{ maxHeight: "180px", overflow: "scroll" }}>{meal?.strInstructions}</p>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card" style={orderStyle}>
                        <div className="card-body">
                            <h3 className="card-title text-center"> <b>{meal?.strMeal}</b></h3>

                            <p className="card-text">Category: <b>{meal?.strCategory}</b></p>
                            <p className='card-text'><label>Area</label>: <b>{meal?.strArea}</b> </p>
                            <p><label>Recipe</label>: <a href={meal?.strSource} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "500px" }}>{meal?.strSource}</a> </p>
                            <p><label>Youtube</label>: <a href={meal?.strYoutube} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "500px" }}>{meal?.strYoutube}</a> </p>

                            <label>Quantity</label>
                            <input type="number" className="form-control"
                                placeholder="quantity" required="required" id="quantity" min={1}
                                value={order.quantity} onChange={(e) => setOrder({ ...order, "quantity": e.target.value })}
                            />
                            <form onSubmit={placeOrder}>
                                <div className="card p-10">
                                    <div className="card">
                                        <p className='text-center' style={{ fontSize: "40px", color: "black" }}>Rs. <b>{order.price}</b></p>
                                        <div >
                                            <button style={{height:"50px", fontSize:"24px"}} className="btn btn-success btn-block"><b>Place Order</b></button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
