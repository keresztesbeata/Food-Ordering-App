import {BASE_URL, customError, getSessionItem, isAdmin, isLoggedIn, removeSessionItem, SESSION_KEY} from "./utils";
import axios from "axios";

const ORDERS_URL = BASE_URL + "/orders";

export function getOrdersByRestaurant(restaurantName) {
    const url = ORDERS_URL + "/restaurant/" + restaurantName;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(data)
            console.log(`Successfully retrieved ${data.length} orders!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch orders for restaurant ${restaurantName}!`);
        });
}

export function getOrdersByCustomer(customerName) {
    const url = ORDERS_URL + "/customer/" + customerName;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(data)
            console.log(`Successfully retrieved ${data.length} orders!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch orders for customer ${customerName}!`);
        });
}

export function validateCartContent(cartContent) {
    const isValidCartContent = cartContent.map(item => item.food.restaurant
        .every((value, i, array) => value === array[0]));

    if (!isValidCartContent) {
        throw customError("Cannot add food items from different restaurants in the same cart!");
    }
}

export function createOrder(orderData) {
    if (!isLoggedIn()) {
        throw customError("Creating the order failed!", `No logged in user!`);
    }
    if (isAdmin()) {
        throw customError("Not authorized!", "Only customers can create an order!");
    }
    const customer = getSessionItem(SESSION_KEY.USER_KEY);

    if (orderData.items.length === 0) {
        throw customError("Cannot create an order with 0 items!");
    }

    validateCartContent(orderData.items);

    if (orderData.totalPrice < 0) {
        throw customError("Total price cannot be negative!");
    }

    orderData["customer"] = customer._id;
    orderData["restaurant"] = orderData.items.map(item => item.food.restaurant)[0];

    return axios.post(ORDERS_URL, orderData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully created order with id ${data._id} for customer ${customer.credentials.username}!`);
            removeSessionItem(SESSION_KEY.CART_KEY);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to create order!", `Invalid data!`);
        });
}