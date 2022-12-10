import React from "react";
import {Header} from "../components/Header";
import {RestaurantMenu} from "../components/restaurant/RestaurantMenu";
import {isAdmin} from "../api/utils";
import {ManagerView} from "./ManagerView";

export const Home = () => {
    return (
        isAdmin() ?
            <div>
                <Header/>
                <ManagerView/>
            </div>
            :
            <div>
                <Header/>
                <RestaurantMenu/>
            </div>
    );
};