import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import SERVER_API_BASE_URL from '../../api/ServerApi';

export default function MealFeedback() {

    const [feedback, setFeedback] = useState({
        userName: "",
        email: "",
        feedbackContent: ""
    });
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(

        () => {
            let isMounted = true;
            axios.get(SERVER_API_BASE_URL + '/feedbacks')
                .then((res) => {
                    if (isMounted) setFeedbackList(res.data)
                }).catch(error => { console.log(error) })

            return () => { isMounted = false };
        }, [])


    const onSubmit = (e) => {
        e.preventDefault();

        let url = SERVER_API_BASE_URL + '/feedback'

        axios.post(url, feedback).then((res) => {
            setFeedbackList([...feedbackList, feedback])
            swal('Feedback recieved', 'Congrats', 'success');
        }).catch(error => { console.log(error) })
        
    }

    const feedbackListContent = feedbackList.map((feedback, index) => {
        return <tbody key={index}>
            <tr style={{ color: "white" }}>
                <td>{feedback.userName}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedbackContent}</td>
            </tr>
        </tbody>
    })

    const feedbackStyle = {
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        color: 'white',
        textShadow: '2px 1px black',
        borderRadius: '20px',
        marginTop: '20px',
    }

    return (
        <div className='component'>
            <div className="row" >
                <div className="col-sm-6">
                    <div className="card" style={feedbackStyle}>
                        <div className="card-body" >
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h3 className="text-center">Feedback Form</h3>
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Name" required
                                        value={feedback.userName} onChange={(e) => setFeedback({ ...feedback, userName: e.target.value })} />
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" required
                                        value={feedback.email} onChange={(e) => setFeedback({ ...feedback, email: e.target.value })} />
                                    <label>Feedback</label><br />
                                    <textarea className="form-control" name="message" rows="5" required
                                        value={feedback.feedbackContent} onChange={(e) => setFeedback({ ...feedback, feedbackContent: e.target.value })} />
                                </div>
                                <div>
                                    <button className="btn btn-success btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card" style={feedbackStyle}>
                        <div className="card-body" style={{height:"600px",overflow:"auto"}} >
                            <h3 className="text-center">Recent Feedbacks</h3>

                            <table className="table">
                                <thead>
                                    <tr style={{ color: "white" }}>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Comment</th>
                                    </tr>
                                </thead>
                                {feedbackListContent}
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
