import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import {AddressInput} from "../cart/AddressInput";
import {editUser} from "../../api/usersApi";
import {FormMessage} from "../FormMesage";
import {getSessionItem, SESSION_KEY} from "../../api/utils";

export const AddCustomerInfo = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState({
        city: "",
        street: "",
        nr: 0
    })
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmitForm = e => {
        e.preventDefault()
        const loggedInUser = getSessionItem(SESSION_KEY.USER_KEY);
        if(loggedInUser) {
            const id = loggedInUser._id;
            const form = {
                firstname: firstname,
                lastname: lastname,
                address: address
            }
            editUser(id, form)
                .then(() => {
                    window.location.href = "/home";
                })
                .catch(error => setErrorMessage({message: error.message, details: error.details, isError: true}));
        }
    };

    return (
        <div className="background-container page-background d-flex justify-content-center align-items-center mt-5">
            <div className="card col-sm-3 border-dark text-left">
                <Form onSubmit={onSubmitForm} className={"card-body"}>
                    <h1>Account setup</h1>
                    <FormMessage data={errorMessage}/>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl type={"text"} name={"firstname"} onChange={e => setFirstname(e.target.value)}
                                     required></FormControl>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl type={"text"} name={"lastname"} onChange={e => setLastname(e.target.value)}
                                     required></FormControl>
                    </FormGroup>
                    <AddressInput data={address} onInputChange={e => setAddress({...address, [e.target.name]: e.target.value})}/>
                    <div className="text-center">
                        <Button type={"submit"}>Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}