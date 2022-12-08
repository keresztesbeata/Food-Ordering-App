import React from "react";
import {Header} from "../components/Header";
import {OrdersList} from "../components/order/OrdersList";

const orders = [{
    "_id": "638a6fb8993eeb4b53efcf03",
    "restaurant": "6388be157a96fb6e669cc7b3",
    "customer": "6388729601aa5086b4dc0c42",
    "delivery_address": {
        "city": "Asgard",
        "street": "Palace street",
        "nr": 1
    },
    "order_date": "1670016952127",
    "total_price": 132.5,
    "items": [
        {
            "id": "Four Cheese Pastata",
            "quantity": 1
        },
        {
            "id": "Prosciutto Cotto",
            "quantity": 2
        }
    ]
}, {
    "_id": "638a701f993eeb4b53efcf07",
    "restaurant": "638929b7c80869a31848f7b6",
    "customer": "6388729601aa5086b4dc0c42",
    "delivery_address": {
        "city": "Asgard",
        "street": "Palace street",
        "nr": 1
    },
    "order_date": "1670017055738",
    "total_price": 151.5,
    "items": [
        {
            "id": "Chicken gyros",
            "quantity": 1
        },
        {
            "id": "Chicken souvlaki on a plate",
            "quantity": 2
        },
        {
            "id": "Baklava",
            "quantity": 2
        }
    ]
}, {
    "_id": "638a7342964f6821ffc77aaf",
    "restaurant": "638929b7c80869a31848f7b6",
    "customer": "6388729601aa5086b4dc0c42",
    "delivery_address": {
        "city": "Asgard",
        "street": "Palace street",
        "nr": 1
    },
    "order_date": "1670017858992",
    "total_price": 151.5,
    "items": [
        {
            "id": "Chicken gyros",
            "quantity": 1
        },
        {
            "id": "Chicken souvlaki on a plate",
            "quantity": 2
        },
        {
            "id": "Baklava",
            "quantity": 2
        }
    ]
}]

export const Orders = () => {
    return (
        <div>
            <Header/>
            <div className="flex justify-content-center align-items-center m-auto w-75">
                <OrdersList data={orders}/>
            </div>
        </div>
    );
};