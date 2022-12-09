import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {RestaurantItem} from "./RestaurantItem";

export const RestaurantsList = (props) => {

    const displayRestaurantItem = (orderData) =>
        <ListGroupItem className={"p-3"} name={orderData._id} key={orderData._id}>
            <RestaurantItem data={orderData} onClick={props.onSelect}/>
        </ListGroupItem>

    return (
        <div className={"flex-column gap-2"}>
            <ListGroup>
                {
                    props.data.map(displayRestaurantItem)
                }
            </ListGroup>
        </div>
    );
};