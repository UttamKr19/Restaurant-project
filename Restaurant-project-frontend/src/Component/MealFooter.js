import React from 'react'

export default function MealFooter() {
    const footStyle={
        backgroundColor:"gray",
        color:"white",
        padding:"5px"
    }
    return (
        <div style={footStyle}>
            <span style={{float:'left'}}>Address: Avenue Street, Galaxy road, Jupiter, Milky Way</span>
            <span style={{marginLeft:'20px'}}>Contact: 88756934963</span>
            <span style={{float:'right'}}>Copyright : (c) 2020</span>
        </div>
    )
}
