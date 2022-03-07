import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MEALDB_API_BASE_URL from '../api/MealDbServiceApi';
import '../App.css';
export default function MealCategoryFood(props) {

    const [categoryFoodData, setCategoryFoodData] = useState();

    useEffect(() => {
        let url = MEALDB_API_BASE_URL + '/filter.php?c=' + props.category

        axios.get(url).then((res) => {
            setCategoryFoodData(res.data.meals);
        }).catch(error => { console.log(error) })

    }, [props.category]) // added dependency later

    const cardStyle = {
        height: '100%',
        maxWidth: '400px',
        minWidth: '100px',
        color: 'white',
        textShadow: '2px 1px black',
        backgroundColor: "rgba(112, 111, 111, 0.39)",

    }

    const cardBodyStyle = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }

    const categoryFoodContent = categoryFoodData?.map((item) => {
        return (
            <div key={item.idMeal} >
                <div>
                    <div className="card" style={cardStyle}>
                        <img className="card-img-top" src={item.strMealThumb}
                            alt="meal-pic"
                            datatoggle='tooltip' title={item.strMeal} />
                        <div className="card-body ">
                            <div className="card-title" style={cardBodyStyle}>
                                <span className='text-center justify-content-center h4'>{item.strMeal}</span>
                            </div>
                            <Link
                                to={{
                                    pathname: '/order',
                                    state: { item: item, category: props.category, idMeal: item.idMeal }
                                }}
                            >
                                <button className="btn btn-primary">Order Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    })



    return (

        <div className='component'>

            <div className="text-center" >
            <div className=" row justify-content-center card-deck"  style={{padding:"10px"}}>
                    {categoryFoodContent}
                </div>
            </div>

        </div>

    )
}
