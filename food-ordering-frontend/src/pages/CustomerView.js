import React from "react";
import {RestaurantMenu} from "../components/restaurant/RestaurantMenu";
import {Header} from "../components/Header";

export const CustomerView = () => {
    return (
    <div>
        <Header/>
        <RestaurantMenu/>
    </div>
    );
};