import React from "react";
import {Accordion} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import {BsCheckCircle, BsStar} from "react-icons/bs";

export const RestaurantItem = (props) => {

    return (
        <Accordion defaultActiveKey="0" className={"border-dark"} id={props.data._id} data-toggle="collapse">
            <AccordionItem eventKey={props.data._id}>
                <Accordion.Header>
                    <BsCheckCircle onClick={() => props.onClick(props.data.name)}
                                   className={"me-2"}
                                   hidden={props.disable}></BsCheckCircle>
                    {props.data.name}
                </Accordion.Header>
                <Accordion.Body>
                    <p>Owner: {props.data.owner}</p>
                    <p>Address: {props.data.address.city}, {props.data.address.street}, nr. {props.data.address.nr}</p>
                    <p>Delivery fee: {props.data.delivery_fee} RON</p>
                    <p>Schedule: {props.data.schedule.opening_hour} - {props.data.schedule.closing_hour}</p>
                    <p>Rating: {props.data.rating} <BsStar/></p>
                    <p>Tags: {props.data.tags.join(", ")}</p>
                </Accordion.Body>
            </AccordionItem>
        </Accordion>
    );
};