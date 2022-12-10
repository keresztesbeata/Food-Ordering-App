import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {Orders} from "../pages/Orders";
import {Cart} from "../pages/Cart";
import {AddCustomerInfo} from "../components/user/AddCustomerInfo";
import {AddRestaurant} from "../components/restaurant/AddRestaurant";
import {Logout} from "../pages/Logout";


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/add_customer_info" element={<AddCustomerInfo/>}/>
                <Route path="/add_restaurant" element={<AddRestaurant/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
        </BrowserRouter>
    );
};