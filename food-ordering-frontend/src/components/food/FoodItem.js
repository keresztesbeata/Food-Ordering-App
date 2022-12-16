import React from "react";
import {Button, Card} from "react-bootstrap";
import {BsFillCartPlusFill} from "react-icons/bs";

export const FoodItem = (props) => {
    return (
        <Card className={"border-dark"}>
            <Card.Img variant="top"
                      src={require("../../images/"+props.data.category+"/empty.jpg")}/>
            <Card.Body>
                <div className={"d-flex justify-content-between"}>
                    <div>
                        <Card.Title>
                            {props.data.name}
                        </Card.Title>
                        <Card.Subtitle>
                            {props.data.category}
                        </Card.Subtitle>
                    </div>
                    <Button onClick={() => props.onClick(props.data)} variant={"success"}>Add to
                        cart <BsFillCartPlusFill/></Button>
                </div>
            </Card.Body>
            <Card.Footer>
                <Card.Text>{props.data.ingredients.toString().replaceAll(",", ", ")}</Card.Text>
                <div className={"d-flex justify-content-between"}>
                    <Card.Text>{props.data.portion_size} g</Card.Text>
                    <Card.Text>{props.data.price} RON</Card.Text>
                </div>
            </Card.Footer>
        </Card>
    );
};