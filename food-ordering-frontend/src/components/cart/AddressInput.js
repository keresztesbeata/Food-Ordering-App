import {FormControl, InputGroup} from "react-bootstrap";
import React from "react";

export const AddressInput = (props) => {
    return (
        <div>
            <InputGroup>
                <InputGroup.Text>City:</InputGroup.Text>
                <FormControl type={"text"} name={"city"} onChange={props.onInputChange}/>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>Street:</InputGroup.Text>
                <FormControl type={"text"} name={"street"} onChange={props.onInputChange}/>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>Nr:</InputGroup.Text>
                <FormControl type={"text"} name={"nr"} onChange={props.onInputChange}/>
            </InputGroup>
        </div>
    )
}