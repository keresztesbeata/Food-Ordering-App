import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {CartItem} from "./CartItem";

export const CartContent = (props) => {
    const displayCartItem = (cartItem) =>
        <ListGroupItem className={"p-3"} name={cartItem.food._id} key={cartItem.food._id}>
            <CartItem data={cartItem} onUpdate={props.onUpdate} onRemove={props.onRemove}/>
        </ListGroupItem>

    return (
        <div className={"flex-column gap-2"}>
            <ListGroup>
                {
                    props.data.length > 0 ?
                        props.data.map(displayCartItem)
                        :
                        <p>Your cart is empty!</p>
                }
            </ListGroup>
        </div>
    );
};