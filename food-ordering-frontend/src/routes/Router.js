import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {Orders} from "../pages/Orders";
import {Cart} from "../pages/Cart";
import {AddCustomerInfo} from "../components/user/AddCustomerInfo";
import {AddRestaurant} from "../components/restaurant/AddRestaurant";
import {ProtectedComponent} from "../components/ProtectedComponent";
import {isLoggedIn, USER_ROLE} from "../api/utils";
import {ManagerView} from "../pages/ManagerView";


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home"
                       element={<ProtectedComponent component={<Home/>} authority={[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER]}/>}/>
                <Route path="/login" element={isLoggedIn() ? <Home/> : <Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/add_customer_info"
                       element={<ProtectedComponent component={<AddCustomerInfo/>} authority={[USER_ROLE.CUSTOMER]}/>}/>
                <Route path="/add_restaurant"
                       element={<ProtectedComponent component={<AddRestaurant/>} authority={[USER_ROLE.ADMIN]}/>}/>
                <Route path="/menu"
                       element={<ProtectedComponent component={<ManagerView/>} authority={[USER_ROLE.ADMIN]}/>}/>
                <Route path="/orders"
                       element={<ProtectedComponent component={<Orders/>}
                                                    authority={[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER]}/>}/>
                <Route path="/cart"
                       element={<ProtectedComponent component={<Cart/>} authority={[USER_ROLE.CUSTOMER]}/>}/>
            </Routes>
        </BrowserRouter>
    );
};