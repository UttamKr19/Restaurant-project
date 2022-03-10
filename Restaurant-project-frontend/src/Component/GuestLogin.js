import React from 'react'

export default function GuestLogin() {

    const guestLoginStyle = {
        padding: '10px 20px 0px 20px',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderRadius: '20px',
        color: 'white',
        fontSize: '20px',
        textShadow: '2px 1px black'
    }
    return (
        <div style={guestLoginStyle}><h6>Guest login credentials:</h6>
            <h6>username: "guest"</h6>
            <h6>password: "guest"</h6>
            <hr />
        </div>
    )
}
