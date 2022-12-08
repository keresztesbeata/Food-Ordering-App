import React from "react";
import {Col, Row} from "react-bootstrap";
import {FoodsItem} from "./FoodsItem";

export const FoodsList = (props) => {
    const categories = ["Appetizers", "Pizza", "Pasta", "Soup", "Dessert", "Main"];

    const onSelectFood = (ev) => {
        console.log(ev.target.id); // food id
    }

    const displayFoodItem = (foodData) =>
        <Col className={"p-3"} name={foodData.name}>
            <FoodsItem data={foodData} onClick={onSelectFood}/>
        </Col>

    return (
        categories.map(category =>
            <div className={"flex-column gap-2"}>
                <h1>{category}</h1>
                <Row sm={"3"} className="align-items-stretch justify-content-start">
                    {props.data.filter(foodData => foodData.category === category)
                        .map(displayFoodItem)
                    }
                </Row>
            </div>
        )
    );
};