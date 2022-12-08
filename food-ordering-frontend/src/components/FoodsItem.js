import React from "react";
import {Button, Card} from "react-bootstrap";
import {BsFillCartPlusFill} from "react-icons/bs"

export const FoodsItem = (props) => {
    return (
        <Card className={"border-dark"}>
            <Card.Header>
                <div className={"d-flex justify-content-between"}>
                    <div>
                        <Card.Title>
                            {props.data.name}
                        </Card.Title>
                        <Card.Subtitle>
                            {props.data.category}
                        </Card.Subtitle>
                    </div>
                    <Button id={props.data._id} onClick={props.onClick} variant={"success"}>Add to cart <BsFillCartPlusFill/></Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>{props.data.ingredients}</Card.Text>
                <div className={"d-flex justify-content-between"}>
                    <Card.Text>{props.data.portion_size} g</Card.Text>
                    <Card.Text>{props.data.price} RON</Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};