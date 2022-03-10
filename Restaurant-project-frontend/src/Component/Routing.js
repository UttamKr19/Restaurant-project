import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './User/Login';
import MealAboutUs from './Meal/MealAboutUs';
import MealCategories from './Meal/MealCategories';
import MealHeader from './Meal/MealHeader';
import MealFeedback from './Meal/MealFeedback';
import MealHome from './Meal/MealHome';

import MealOrder from './Meal/MealOrder';
import Register from './User/Register';
import Profile from './User/Profile';

export default function Routing() {
    return (
        <div className="routing">
            <Router>
                <MealHeader/>

                <Switch>
                    <Route exact path="/">
                        <MealHome/>
                    </Route>
                    <Route path="/home">
                        <MealHome/>
                    </Route>
                    <Route path="/categories">
                        <MealCategories />
                    </Route>
                    <Route path="/order">
                        <MealOrder />
                    </Route>
                    <Route path="/feedback">
                        <MealFeedback />
                    </Route>
                    <Route path="/about">
                        <MealAboutUs />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/logout">
                        <Login />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="*">
                        <MealHome />
                    </Route>

                </Switch>
            </Router>

        </div>


    )
}
