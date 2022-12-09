import React from "react";
import {Col, Row} from "react-bootstrap";
import {FoodItem} from "./FoodItem";
import {validateCartContent} from "../../api/ordersApi";
import {NOTIFICATION_TYPES} from "../Notification";

export const FoodsList = (props) => {

    const onSelectFood = (selectedFood) => {
        console.log("Adding " + selectedFood.name + " to the cart!");

        let newItem = {food: selectedFood, quantity: 1};
        let cartContent = sessionStorage.getItem('cartContent');

        if (cartContent !== null) {
            cartContent = JSON.parse(cartContent);
            console.log('Previous cart content:');
            cartContent.forEach(item => console.log('(' + item.food.name + ' - ' + item.food.price + ') x ' + item.quantity));

            try {
                validateCartContent(cartContent)
            } catch (error) {
                props.setNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR});
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
            cartContent = [newItem]
        }
        sessionStorage.setItem('cartContent', JSON.stringify(cartContent));

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