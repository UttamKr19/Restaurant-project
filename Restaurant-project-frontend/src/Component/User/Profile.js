import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SERVER_API_BASE_URL from '../../api/ServerApi';
import Login from './Login';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { getUserToken, deleteUserToken } from '../UseToken';


export default function Profile() {
    const history = useHistory();
    const [userToken, setUserToken] = useState({
        username: '',
        isLoggedIn: false
    })
    const [currentPass, setCurrentPass] = useState('')
    const [orderList, setOrderList] = useState([]);
    const [user, setUser] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        address: "",
        role: "ROLE_USER",
        enabled: true
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

            if (token) {
                axios.get(SERVER_API_BASE_URL + '/order/?username=' + token.username)
                    .then((res) => {
                        if (isMounted) {
                            setOrderList(res.data)
                        }
                    }).catch(error => { console.log(error) })

                axios.get(SERVER_API_BASE_URL + '/user/?username=' + token.username)
                    .then((res) => {
                        if (isMounted) {
                            setUser(res.data)
                            // setUser({...user,password:user.password!=''?'':''})
                        }
                    }).catch(error => { console.log(error) })
            }

            return () => { isMounted = false };
        }, [])


    const onSubmit = (e) => {
        e.preventDefault();

        let url = SERVER_API_BASE_URL + '/user'

        axios.put(url, user).then((res) => {
            if (res.status === 200) {
                swal('user registered', 'Congrats', 'success');
                history.push("/login")
            }
        }).catch(error => {
            swal('something went wrong!!', 'Try again', 'error'); //400
        })

    }

    const onDeleteAccount = () => {
        let creds = { username: userToken.username, password: currentPass }
        console.log(creds)
        swal({
            title: "Are you sure?",
            text: "All your data will be permanently deleted!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let url = SERVER_API_BASE_URL + '/user/delete'
                    axios.post(url, { username: userToken.username, password: currentPass })
                        .then((res) => {
                            if (res.status === 200) {
                                deleteUserToken()
                                window.location.reload()
                                swal('user deleted', 'Bye', 'success');
                                history.push("/")
                            }

                        }).catch(error => {
                            if (error?.response?.status === 304) {
                                swal('wrong password!!', 'Try again', 'warning'); //304
                            }
                            else {
                                swal('something went wrong!!', 'Try again', 'error'); //400
                            }

                        })
                }
            });
    }

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

        <div className='component'>
            <div className="row" >
                <div className="col-sm-6">
                    <div className="card" style={prevOrdersStyle}>
                        <div className="card-body" >
                            <form onSubmit={onSubmit}>
                                <div>
                                    <label>Username:  </label> <span>{user.username}</span><br />
                                    <label>Email: </label> <span>{user.email}</span>

                                    <h3 className="text-center">Update info</h3>
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Name" required
                                        value={user.name} onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                                    <label>Address</label>
                                    <input type="address" className="form-control" placeholder="Address" rows="5" required
                                        value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                                    <label>New Password</label><br />
                                    <input type="password" className="form-control" name="password" required
                                        value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block">Update</button>
                                </div>
                            </form>
                            <hr />

                            <div>
                                <h3 className="text-center">Delete Account</h3>
                                <label>Enter current password</label>
                                <div>
                                    <input type="password" className="form-control" name="password" required
                                        value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
                                    <button className="btn btn-danger btn-block" onClick={onDeleteAccount}>Delete account</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card" style={prevOrdersStyle}>
                        <div className="card-body" style={{ height: "600px", overflow: "auto" }} >
                            <h3 className="text-center">Recent Orders</h3>

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
                </div>
            </div>

        </div>
    )
}
