import React from "react";
import {FoodsTable} from "../components/food/FoodsTable";
import {Header} from "../components/Header";

export const ManagerFoodCatalogue = () => {
    return (
        <div>
            <Header/>
            <FoodsTable/>
        </div>
    );
};