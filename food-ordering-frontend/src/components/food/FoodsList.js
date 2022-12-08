import React from "react";
import {Col, Row} from "react-bootstrap";
import {FoodItem} from "./FoodItem";

export const FoodsList = (props) => {
    const onSelectFood = (selectedFood) => {
        console.log("Adding " + selectedFood.name + " to the cart!");
        let newItem = {food: selectedFood, quantity: 1};
        let cartContent = sessionStorage.getItem('cartContent');
        if (cartContent !== null) {
            cartContent = JSON.parse(cartContent);
            console.log('Previous cart content:');
            cartContent.forEach(item => console.log('('+item.food.name + ' - ' + item.food.price + ') x ' + item.quantity));
            const existingItem = cartContent.filter(item => item.food._id === selectedFood._id);
            if(existingItem.length > 0) {
                let updatedItem = existingItem[0];
                updatedItem.quantity += 1;
                let rest = cartContent.filter(item => item.food._id !== selectedFood._id);
                rest.push(updatedItem);
            }else{
                cartContent.push(newItem);
            }
        } else {
            cartContent = [newItem]
        }
        sessionStorage.setItem('cartContent', JSON.stringify(cartContent));

        console.log('New cart content:');
        cartContent.forEach(item => console.log('('+item.food.name + ' - ' + item.food.price + ') x ' + item.quantity));
    }

    const displayFoodItem = (foodData) =>
        <Col className={"p-3"} name={foodData._id} key={foodData._id}>
            <FoodItem data={foodData} onClick={onSelectFood}/>
        </Col>

    return (
        <div className={"flex-column gap-2"}>
            <h1>{props.category}</h1>
            <Row sm={"3"} className="align-items-stretch justify-content-start">
                {props.data.map(displayFoodItem)}
            </Row>
        </div>
    );
};