import React from "react";
import {Header} from "../components/Header";
import {RestaurantMenu} from "../components/restaurant/RestaurantMenu";

export const Home = () => {
    return (
        <div>
            <Header/>
            <RestaurantMenu/>
        </div>
    );
};