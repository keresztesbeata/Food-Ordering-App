import React from "react";
import {EditableRestaurant} from "../components/restaurant/EditableRestaurant";
import {getSessionItem, SESSION_KEY} from "../api/utils";

export const ManagerView = () => {
    const restaurant = getSessionItem(SESSION_KEY.RESTAURANT_KEY);
    return (
        <div>
            <EditableRestaurant restaurant={restaurant}/>
        </div>
    );
};