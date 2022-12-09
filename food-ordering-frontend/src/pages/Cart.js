import React, {useEffect, useState} from "react";
import {Header} from "../components/Header";
import {CartContent} from "../components/cart/CartContent";
import {Button, Form} from "react-bootstrap";
import {AddressInput} from "../components/cart/AddressInput";
import {Notification, NOTIFICATION_TYPES} from "../components/Notification";
import {createOrder} from "../api/ordersApi";

const initCartContent = () => {
    const content = JSON.parse(sessionStorage.getItem('cartContent'));
    return content !== null ? content : [];
}

export const Cart = () => {
    const [cartContent, setCartContent] = useState(() => initCartContent())
    const [address, setAddress] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        details: "",
        type: NOTIFICATION_TYPES.ERROR
    });

    const onCreateOrder = (e) => {
        e.preventDefault();
        let orderData = {
            items: cartContent,
            address: address,
            totalPrice: totalPrice
        }
        createOrder(orderData)
            .then(data => {
                setNotification({
                    show: true,
                    message: "Order registered!",
                    details: `Successfully created the order with id ${data._id}!`,
                    type: NOTIFICATION_TYPES.INFO
                });
                setCartContent([]);
                setTotalPrice(0);
                setAddress({});
            })
            .catch(error => setNotification({
                show: true,
                message: error.message,
                details: error.details,
                type: NOTIFICATION_TYPES.ERROR
            }));
    }

    const onAddressChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setAddress({
            ...address,
            [name]: name === "nr" ? parseInt(value) : value
        });
    }

    const onRemoveItem = (id) => {
        const newContent = cartContent.filter(item => item.food._id !== id);
        setCartContent(newContent);
    }

    const onUpdateItem = (id, quantity) => {
        const newContent = cartContent
            .map(item => {
                if (item.food._id === id) {
                    item.quantity = quantity;
                }
                return item;
            });
        setCartContent(newContent);
    }

    const calculateTotalPrice = (items) => {
        return items.reduce((sum, item) => item.food.price * item.quantity + sum, 0);
    }

    useEffect(() => {
        const total = calculateTotalPrice(cartContent);
        setTotalPrice(total);
        sessionStorage.setItem('cartContent', JSON.stringify(cartContent));
    }, [cartContent, setCartContent]);

    return (
        <div>
            <Header/>
            <Form onSubmit={onCreateOrder} className="flex justify-content-center align-items-center m-auto w-75">
                <Notification data={notification}/>
                <CartContent data={cartContent}
                             onUpdate={onUpdateItem}
                             onRemove={onRemoveItem}/>
                <p>Total price: {totalPrice}</p>
                <p>Enter the delivery address:</p>
                <AddressInput onInputChange={onAddressChange}/>
                <Button type={"submit"} variant={"success"} className={"mt-3 w-100"}>Create order</Button>
            </Form>
        </div>
    );
};