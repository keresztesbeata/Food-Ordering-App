import React from "react";
import {Card} from "react-bootstrap";

export const RestaurantInfo = (props) => {

    return (
        <Card className={"border-dark m-3"}>
            <Card.Header>
                <div className={"d-flex justify-content-between"}>
                    <div>
                        <Card.Title>
                            {props.data.name}
                        </Card.Title>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <p>Owner: {props.data.owner}</p>
                <p>Address: {props.data.address.city}, {props.data.address.street}, {props.data.address.nr}</p>
                <p>Delivery fee: {props.data.delivery_fee}</p>
                <p>Schedule: {props.data.schedule.opening_hour} + " - " + {props.data.schedule.closing_hour}</p>
                <p>Rating: {props.data.rating}</p>
                <p>Tags: {props.data.tags.join(", ")}</p>
            </Card.Body>
        </Card>
    );
};