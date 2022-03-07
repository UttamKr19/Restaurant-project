import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import SERVER_API_BASE_URL from '../api/ServerApi';

export default function MealFeedback() {

    const [feedback, setFeedback] = useState({
        userName:"",
        email:"",
        feedbackContent:""
    });
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(
        
        () => {
            let isMounted = true;
            axios.get(SERVER_API_BASE_URL+'/feedback/all')
                .then((res) => {
                    if (isMounted) setFeedbackList(res.data)
                }).catch(error => { console.log(error) })

            return () => { isMounted = false };
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        
        setFeedbackList([...feedbackList, feedback])

        let url = SERVER_API_BASE_URL+'/feedback/add'

        axios.post(url,feedback).then((res) => {
            // console.log(res);
        }).catch(error => { console.log(error) })

        swal('Feedback recieved', 'Congrats', 'success');
    }

    const feedbackListContent = feedbackList.map((feedback,index) => {
        return <tbody key={index}>
            <tr style={{color:"white"}}>
                <td>{feedback.userName}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedbackContent}</td>
            </tr>
        </tbody>



    })

    const feedbackStyle = {
        padding:'10px 20px 0px 20px',
        minWidth: '600px',
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius:'20px',
        color:'white',
        fontSize:'20px',
        textShadow:'2px 1px black',
        float:"left"
    }

    const feedbackTable={
        padding:'10px',
        width: '600px',
        maxHeight:"500px",
        margin: 'auto',
        borderRadius:'20px',
        marginTop: '20px',
        color:'white',
        fontSize:'20px',
        textShadow:'2px 1px black',
        float:"right",
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        overflow:'auto'
    }
    return (
        <div className='component'>
            <div id="feedback-form" style={feedbackStyle} >
                <form onSubmit={onSubmit}>
                    <div>
                        <h3 className="text-center">Feedback Form</h3>
                        <label>Name</label>
                        <input type="text" className="form-control text-white" placeholder="Name" required
                            value={feedback.userName} onChange={(e) => setFeedback({...feedback,userName:e.target.value})} />
                        <label>Email</label>
                        <input type="email" className="form-control text-white" placeholder="Email" required
                            value={feedback.email} onChange={(e) => setFeedback({...feedback,email:e.target.value})} />
                        <label>Feedback</label><br />
                        <textarea className="form-control text-white" name="message" rows="5"  required
                            value={feedback.feedbackContent} onChange={(e) => setFeedback({...feedback,feedbackContent:e.target.value})} />
                    </div>
                    <div>
                        <button className="btn btn-success btn-block">Submit</button>
                    </div>
                    <hr />
                </form>
            </div>

            <div id="recent-feedbacks"  style={feedbackTable}>
                <hr />
                <h3 className="text-center">Recent Feedbacks</h3>

                <table className="table">
                    <thead>
                        <tr style={{color:"white"}}>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Comment</th>
                        </tr>
                    </thead>
                    {feedbackListContent}
                </table>

            </div>
        </div>
    )
}
