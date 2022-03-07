import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import SERVER_API_BASE_URL from '../api/ServerApi';
import { getUserToken } from './UseToken';


export default function Register() {

    const history = useHistory();
    const [userToken, setUserToken] = useState({
        username:'',
        isLoggedIn:false
    });

    const [user,setUser] =useState({
        name:"",
        email:"",
        password:"",
        address:"",
        role:"ROLE_USER",
        enabled:true
    })
    useEffect(() => {
        const token=getUserToken()
        if(token){
            setUserToken({
                username:token.username,
                isLoggedIn:true
            })
        }
        
      }, []);
    const onSubmit = (e) => {
        e.preventDefault();

        let url = SERVER_API_BASE_URL+'/user/add'

        axios.post(url,user).then((res) => {
            console.log(res);
            if(res.status===201){
                swal('user registered', 'Congrats', 'success');
                history.push("/login")
            }
            else if(res.status==208){
                swal('username/email already in use', 'Try different email', 'error');
            }
        }).catch(error => { console.log(error) })

        
    }

    if(userToken.isLoggedIn){
        history.push("/dashboard")
    }

    const registerStyle = {
        padding:'10px 20px 0px 20px',
        maxWidth: '600px',  
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius:'20px',
        color:'white',
        fontSize:'20px',
        textShadow:'2px 1px black'
    }

    return (
    <div className="container component" >
            {/* {props.backButton!=undefined?<div style={{float:'right',margin:'20px'}} onClick={goBack}><button  className="btn btn-sm btn-danger" >X</button></div>:null} */}
            <div id="registrationForm" style={registerStyle}>
                <form onSubmit={onSubmit}>

                    <div>
                        <h3 className="text-center">Register User</h3>
                        <label>Name</label>
                        <input type="text" className="form-control" 
                            placeholder="Name" required="required" id="name"
                            value={user.name} onChange={(e) => setUser({...user,"name":e.target.value})} 
                            />
                        <label>Email</label>
                        <input type="email" className="form-control" 
                            placeholder="Email" required="required" id="email"
                            value={user.email} onChange={(e) => setUser({...user,"email":e.target.value})} 
                            />
                        <label>Password</label>
                        <input type="password" className="form-control" 
                            placeholder="password" required="required" id="password"
                            value={user.password} onChange={(e) => setUser({...user,"password":e.target.value})} 
                            />

                        <label>Address</label>
                        <textarea type="text" className="form-control" 
                            placeholder="address" required="required" id="address"
                            value={user.address} onChange={(e) => setUser({...user,"address":e.target.value})} 
                            />
                    </div>
                    <hr/>
                    <div>
                        <button className="btn btn-success btn-block" style={{height:"50px"}}>Register</button>
                    </div>

                </form>
            </div>
        </div>

  )
}
