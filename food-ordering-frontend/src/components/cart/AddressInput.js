import {FormControl, InputGroup} from "react-bootstrap";
import React from "react";

export const AddressInput = (props) => {
    return (
        <div>
            <p><strong>Address</strong></p>
            <div className={"flex-row gap-3 mb-3"}>
                <InputGroup className={"mb-3"}>
                    <InputGroup.Text>City:</InputGroup.Text>
                    <FormControl type={"text"} name={"city"} value={props.data.city} onChange={props.onInputChange}/>
                </InputGroup>
                <InputGroup className={"mb-3"}>
                    <InputGroup.Text>Street:</InputGroup.Text>
                    <FormControl type={"text"} name={"street"} value={props.data.street} onChange={props.onInputChange}/>
                </InputGroup>
                <InputGroup className={"mb-3"}>
                    <InputGroup.Text>Nr:</InputGroup.Text>
                    <FormControl type={"text"} name={"nr"} value={props.data.nr.toString()} onChange={props.onInputChange}/>
                </InputGroup>
            </div>
        </div>
    )
}