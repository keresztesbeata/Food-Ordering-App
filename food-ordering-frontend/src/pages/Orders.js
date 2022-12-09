import React, {useState} from "react";
import {Header} from "../components/Header";
import {OrdersList} from "../components/order/OrdersList";
import {getOrdersByCustomer, getOrdersByRestaurant} from "../api/ordersApi";
import {getRestaurantByOwner} from "../api/restaurantApi";
import {Notification, NOTIFICATION_TYPES} from "../components/Notification";

export const Orders = () => {
    const [notification, setNotification] = useState({show: false, message: "", type: NOTIFICATION_TYPES.ERROR});
    const [orders, setOrders] = useState(() => {
        const user = sessionStorage.getItem("user");
        if (user === null) {
            setNotification({
                show: true,
                message: "No logged in user!",
                details: "Log in first to create orders!",
                type: NOTIFICATION_TYPES.ERROR
            });
            return [];
        }
        if (user.role === "ADMIN") {
            return getRestaurantByOwner(user.username)
                .then(restaurant =>
                    getOrdersByRestaurant(restaurant.name)
                        .then(data => setOrders(data))
                        .catch(error => setNotification({
                            show: true,
                            message: error.message,
                            details: error.details,
                            type: NOTIFICATION_TYPES.ERROR
                        })))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    details: error.details,
                    type: NOTIFICATION_TYPES.ERROR
                }));
        }
        return getOrdersByCustomer(user.username)
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