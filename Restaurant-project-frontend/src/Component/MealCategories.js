import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MEALDB_API_BASE_URL from '../api/MealDbServiceApi';
import MealCategoryFood from './MealCategoryFood';
import './meal-home.css';


export default function MealCategories() {
    const [mealCategoryData, setMealCategoryData] = useState();
    const [categoryDisplay, setCategoryDisplay] = useState(true);
    const [categoryContent, setCategoryContent] = useState();

    useEffect(() => {
        axios.get(MEALDB_API_BASE_URL + '/categories.php').then((res) => {
            setMealCategoryData(res.data.categories);
            setCategoryDisplay(true);

        }).catch(error => { console.log(error) })

    }, [])

    function onClickHandle(categoryName) {
        setCategoryDisplay(false)
        let content = <MealCategoryFood category={categoryName} />
        setCategoryContent(content);
    }

    const cardStyle = {
        height: '100%',
        maxWidth: '300px',
        minWidth: '200px',
        color: 'white',
        textShadow: '2px 1px black',
        backgroundColor: "rgba(112, 111, 111, 0.39)",
        cursor: 'pointer',
        padding:"10px"
    }
    const contentInit = mealCategoryData?.map((item) => {
        return (
            <div key={item.idCategory}  >
                <div onClick={() => onClickHandle(item.strCategory)} >
                    <div className="card" style={cardStyle}>
                        <img className="card-img-top" src={item.strCategoryThumb}
                            alt="meal-category-pic"
                            style={{ width: "100%" }}
                            datatoggle='tooltip' title={item.strCategoryDescription}
                            dataplacement="bottom"></img>
                        <h4 className="card-title font-weight-bold text-center"  >{item.strCategory}</h4>
                    </div>
                </div>
                <hr />

            </div>


        )
    })

    return <div className='component'>

        <div className=" h-100 d-flex justify-content-center" style={{padding:"20px"}}>
            <div className="card-deck">
                {categoryDisplay === true ? contentInit : categoryContent}
            </div>
        </div>

    </div>

}
