import React from "react";
import {getSessionItem, SESSION_KEY} from "../api/utils";
import {RestaurantForm} from "../components/restaurant/RestaurantForm";

const restaurant = getSessionItem(SESSION_KEY.RESTAURANT_KEY);

export const SetupRestaurant = () => {
    return (
        <div className="background-container page-background d-flex justify-content-center align-items-center mt-5">
            <div className="card col-sm-3 border-dark text-left">
                <RestaurantForm restaurant={restaurant}/>
            </div>
        </div>
    );
};