import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {OrderItem} from "./OrderItem";

export const OrdersList = (props) => {

    const displayOrderItem = (orderData) =>
        <ListGroupItem className={"p-3"} name={orderData._id} key={orderData._id}>
            <OrderItem data={orderData}/>
        </ListGroupItem>

    return (
        <div className={"flex-column gap-2"}>
            <ListGroup>
                {
                    props.data.length > 0 ?
                        props.data.map(displayOrderItem)
                        :
                        <p>There are no previous orders!</p>
                }
            </ListGroup>
        </div>
    );
};