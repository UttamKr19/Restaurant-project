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

    const descriptionStyle = {
        padding: '10px',
        width: '40%',
        maxHeight: "560px",
        margin: 'auto',
        borderRadius: '20px',
        color: 'white',
        fontSize: '20px',
        textShadow: '2px 1px black',
        float: "right",
        backgroundColor: 'rgba(112, 111, 111, 0.39)',
        overflow: 'auto'
    }


    const orderStyle = {
        padding: '10px',
        width: '50%',
        maxHeight: "580px",
        margin: 'auto',
        borderRadius: '20px',
        color: 'white',
        fontSize: '20px',
        textShadow: '2px 1px gray',
        float: "left",
        backgroundColor: 'rgba(112, 111, 111, 0.39)'
    }

    return (
        <div className='component' >
            <div id="orderForm" style={orderStyle} >
                <form onSubmit={placeOrder}>
                    <div className="card p-10">
                        <img src={meal?.strMealThumb} className="card-img-top" alt="meal-item-pic" style={{ height: "400px" }} />
                        <div className="card">
                            <p className='text-center' style={{ fontSize: "40px" ,color:"black"}}>Rs. <b>{order.price}</b></p>
                            <button className="btn btn-success btn-block"><b>Place Order</b></button>
                        </div>
                    </div>

                </form>
            </div>

            <div id="description" style={descriptionStyle}>
                <div>
                    <h3 className="card-title text-center">{meal?.strMeal}</h3>
                    <label >Category: {meal?.strCategory}</label><br/>
                    <label>Area</label>: {meal?.strArea} <br />
                    <label>Youtube</label>: <a href={meal?.strYoutube} style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{meal?.strYoutube}</a> <br />
                    <label>Instructions</label>
                    <p style={{ maxHeight: "150px", overflow: "scroll" }}>{meal?.strInstructions}</p>
                </div>
                <label>Quantity</label>
                <input type="number" className="form-control" required
                    value={order.quantity}
                    onChange={(e) => setOrder({ ...order, "quantity": e.target.value })}
                    min={1} />
                <hr />
            </div>
        </div>

    )
}
