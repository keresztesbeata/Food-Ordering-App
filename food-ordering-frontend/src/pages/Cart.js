import React, {useEffect, useState} from "react";
import {Header} from "../components/Header";
import {CartContent} from "../components/cart/CartContent";
import {Button, Form} from "react-bootstrap";
import {AddressInput} from "../components/cart/AddressInput";

export const Cart = () => {
    const [cartContent, setCartContent] = useState(() => JSON.parse(sessionStorage.getItem('cartContent')));
    const [address, setAddress] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const createOrder = (e) => {
        e.preventDefault();
        //todo: save the order
        console.log(address)
    }

    const onAddressChange = (e) => {
        let newAddress = address;
        newAddress[e.target.name] = e.target.value;
        setAddress(newAddress);
    }

    useEffect(() => {
        sessionStorage.setItem('cartContent', JSON.stringify(cartContent));
    }, [cartContent, setCartContent]);

    const onRemoveItem = (id) => {
        const newContent = cartContent.filter(item => item.food._id !== id);
        setCartContent(newContent);
    }

    const calculateTotalPrice = (items) => {
        return items.reduce((sum, item) => item.food.price * item.quantity + sum, 0);
    }

    useEffect(() => {
        const total = calculateTotalPrice(cartContent);
        setTotalPrice(total);
    }, [cartContent]);

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

    return (
        <div>
            <Header/>
            <Form onSubmit={createOrder} className="flex justify-content-center align-items-center m-auto w-75">
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