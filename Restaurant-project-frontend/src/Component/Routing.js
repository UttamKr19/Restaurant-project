
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './User/Login';
import MealAboutUs from './MealAboutUs';
import MealCategories from './MealCategories';
import MealHeader from './MealHeader'
import MealFeedback from './MealFeedback';
import MealHome from './MealHome';

import MealOrder from './MealOrder';
import Register from './User/Register';
import UserDashboard from './User/UserDashboard';

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
                    <Route path="/dashboard">
                        <UserDashboard />
                    </Route>

                </Switch>
            </Router>

        </div>


    )
}
