import React from "react";
import {Col, Row} from "react-bootstrap";
import {FoodItem} from "./FoodItem";
import {NOTIFICATION_TYPES} from "../Notification";
import {customError, getSessionItem, SESSION_KEY, setSessionItem} from "../../api/utils";

export const FoodsList = (props) => {

    function isValidItem(cartContent, newItem) {
        const isValidCartContent = cartContent
            .every((item) => item.food.restaurant === newItem.food.restaurant);

        if (!isValidCartContent) {
            throw customError("Invalid operation!", "Cannot add food items from different restaurants in the same cart!");
        }
    }

    const onSelectFood = (selectedFood) => {
        console.log("Adding " + selectedFood.name + " to the cart!");

        let newItem = {food: selectedFood, quantity: 1};
        let cartContent = getSessionItem(SESSION_KEY.CART_KEY)

        if (cartContent !== null) {
            console.log('Previous cart content:');
            cartContent.forEach(item => console.log('(' + item.food.name + ' - ' + item.food.price + ') x ' + item.quantity));

            try {
                isValidItem(cartContent, newItem);
            } catch (error) {
                props.setNotification({show: true, message: error.message, details: error.details, type: NOTIFICATION_TYPES.ERROR});
                return;
            }

            const existingItem = cartContent.filter(item => item.food._id === selectedFood._id);

            if (existingItem.length > 0) {
                let updatedItem = existingItem[0];
                updatedItem.quantity += 1;

                let rest = cartContent.filter(item => item.food._id !== selectedFood._id);
                rest.push(updatedItem);
            } else {
                cartContent.push(newItem);
            }
        } else {
            cartContent = [newItem];
        }

        setSessionItem(SESSION_KEY.CART_KEY, cartContent);

        console.log('New cart content:');
        cartContent.forEach(item => console.log('(' + item.food.name + ' - ' + item.food.price + ') x ' + item.quantity));

        props.setNotification({
            message: "Success!",
            details: `Food item ${newItem.food.name} has been successfully added to the cart!`,
            show: true,
            type: NOTIFICATION_TYPES.INFO
        });
    }

    const displayFoodItem = (foodData) =>
        <Col className={"p-3"} name={foodData._id} key={foodData._id}>
            <FoodItem data={foodData} onClick={onSelectFood}/>
        </Col>

    return (
        <div className={"flex-column gap-2"}>
            <h2>{props.category}</h2>
            <hr/>
            <Row sm={"3"} className="align-items-stretch justify-content-start">
                {props.data.map(displayFoodItem)}
            </Row>
        </div>
    );
};