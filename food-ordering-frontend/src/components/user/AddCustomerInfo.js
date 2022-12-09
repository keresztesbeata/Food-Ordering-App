import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import {AddressInput} from "../cart/AddressInput";
import {useNavigate} from "react-router-dom";
import {editUser} from "../../api/usersApi";
import {FormErrorMessage} from "../FormErrorMesage";

export const AddCustomerInfo = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        address: {
            city: "",
            street: "",
            nr: 0
        }
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onInputChange = e => {
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onAddressChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({
            ...form,
            address: {
                [name]: name === "nr" ? parseInt(value) : value
            }
        });
        setErrorMessage(null)
    };

    const onSubmitForm = e => {
        e.preventDefault();
        editUser(form)
            .then(() => {
                navigate("/");
            })
            .catch(error => setErrorMessage({message: error.message, details: error.details}));
    };

    return (
        <div className="background-container page-background d-flex justify-content-center align-items-center mt-5">
            <div className="card col-sm-3 border-dark text-left">
                <Form onSubmit={onSubmitForm} className={"card-body"}>
                    <h1>Account setup</h1>
                    <FormErrorMessage error={errorMessage}/>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl type={"text"} name={"firstname"} onChange={onInputChange}
                                     required></FormControl>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl type={"text"} name={"lastname"} onChange={onInputChange}
                                     required></FormControl>
                    </FormGroup>
                    <AddressInput onInputChange={onAddressChange}/>
                    <div className="text-center">
                        <Button type={"submit"}>Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}