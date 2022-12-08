import React from "react";
import {Button, Card} from "react-bootstrap";

export const CartItem = (props) => {
    const onIncrementQuantity = (item) => {
        const newQuantity = item.quantity + 1;
        props.onUpdate(item.food._id, newQuantity);
    }
    const onDecrementQuantity = (item) => {
        const newQuantity = item.quantity - 1;
        props.onUpdate(item.food._id, newQuantity);
    }
    return (
        <Card className={"border-dark"}>
            <Card.Body>
                <Card.Text>{props.data.food.name} x {props.data.quantity}</Card.Text>
                <Button onClick={() => onIncrementQuantity(props.data)} variant={"success"}> + </Button>
                <Button onClick={() => onDecrementQuantity(props.data)} variant={"danger"}
                        disabled={props.data.quantity <= 1}> - </Button>
                <Button onClick={() => props.onRemove(props.data.food._id)} variant={"secondary"}> x </Button>
            </Card.Body>
        </Card>
    );
};