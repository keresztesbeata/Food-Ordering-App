import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {Orders} from "../pages/Orders";
import {Cart} from "../pages/Cart";


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/logout" element={<div/>}/>
            </Routes>
        </BrowserRouter>
    );
};