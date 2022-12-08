import React from "react";
import {Accordion, ListGroup, ListGroupItem} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";

export const OrderItem = (props) => {
    const displayOrderedItem = orderedItem =>
        <ListGroupItem key={orderedItem.id}>
            <p>{orderedItem.id} x {orderedItem.quantity}</p>
        </ListGroupItem>;

    return (
        <Accordion defaultActiveKey="0" className={"border-dark"} id={props.data._id} onClick={props.onClick}
                   data-toggle="collapse">
            <AccordionItem eventKey={props.data._id}>
                <Accordion.Header>
                    ID: {props.data._id} - date: {props.data.order_date}, total: {props.data.total_price}
                </Accordion.Header>
                <Accordion.Body>
                    <p>Customer: {props.data.customer}</p>
                    <p>Restaurant: {props.data.restaurant}</p>
                    <p>Date: {props.data.order_date}</p>
                    <p>Address: {props.data.delivery_address.city}, {props.data.delivery_address.street}, {props.data.delivery_address.nr}</p>
                    <p>Ordered items:</p>
                    <ListGroup>
                        {props.data.items.map(displayOrderedItem)}
                    </ListGroup>
                    <p>
                    Total: {props.data.total_price} RON
                    </p>
                </Accordion.Body>
            </AccordionItem>
        </Accordion>
    );
};