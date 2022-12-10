import React, {useState} from "react";
import {Header} from "../components/Header";
import {OrdersList} from "../components/order/OrdersList";
import {getOrdersByCustomer, getOrdersByRestaurant} from "../api/ordersApi";
import {Notification, NOTIFICATION_TYPES} from "../components/Notification";
import {getSessionItem, isAdmin, isLoggedIn, SESSION_KEY} from "../api/utils";

export const Orders = () => {
    const [notification, setNotification] = useState({show: false, message: "", type: NOTIFICATION_TYPES.ERROR});
    const [orders, setOrders] = useState(() => {
        if (isAdmin()) {
            const restaurant = getSessionItem(SESSION_KEY.RESTAURANT_KEY);
            getOrdersByRestaurant(restaurant.name)
                .then(data => setOrders(data))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    details: error.details,
                    type: NOTIFICATION_TYPES.ERROR
                }));
        }
        const user = getSessionItem(SESSION_KEY.USER_KEY);
        return getOrdersByCustomer(user.credentials.username)
            .then(data => setOrders(data))
            .catch(error => setNotification({
                show: true,
                message: error.message,
                details: error.details,
                type: NOTIFICATION_TYPES.ERROR
            }));

    });
    return (
        <div>
            <Header/>
            <div className="flex justify-content-center align-items-center m-auto w-75">
                <Notification data={notification}/>
                <OrdersList data={orders}/>
            </div>
        </div>
    );
};