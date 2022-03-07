import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SERVER_API_BASE_URL from '../../api/ServerApi';
import Login from './Login';
import { getUserToken } from '../UseToken';


export default function UserDashboard() {
    const [userToken, setUserToken] = useState({
        username: '',
        isLoggedIn: false
    })

    const [orderList, setOrderList] = useState([]);

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

            if (token) {
                axios.get(SERVER_API_BASE_URL + '/user/order/?username=' + token.username)
                    .then((res) => {

                        if (isMounted) {
                            setOrderList(res.data)
                        }
                    }).catch(error => { console.log(error) })
            }

            return () => { isMounted = false };
        }, [])

    const orderListContent = orderList?.map((order) => {
        return <tbody key={order.orderId}>
            <tr style={{ color: 'white' }}>
                <td>{order.orderNo}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>Rs. {order.price}</td>
            </tr>
        </tbody>
    })

    if (userToken.isLoggedIn === false) {
        return <Login />
    }

    const prevOrdersStyle = {
        padding: '10px',
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius: '20px',
        color: 'white',
        textShadow: '2px 1px black'
    }
    return (

        <div className="container component">
            <hr/>
            <h1 className='text-center text-white'>Welcome <b>{userToken?.username}</b></h1>
            <hr/>
            <div style={prevOrdersStyle} >
                <hr />
                <h2 className='text-center'>Previous Orders</h2>
                <hr />
                <table className="table">
                    <thead>
                        <tr style={{ color: 'white' }}>
                            <th scope="col">Order ID</th>
                            <th scope="col">Food Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    {orderListContent}
                </table>
            </div>
        </div>
    )
}
