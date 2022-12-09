import React, {useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap";
import {BsStar} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {FormErrorMessage} from "../FormErrorMesage";
import {AddressInput} from "../cart/AddressInput";
import {addRestaurant} from "../../api/restaurantApi";

export const AddRestaurant = () => {
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
        addRestaurant(form)
            .then(() => {
                navigate("/");
            })
            .catch(error => setErrorMessage({message: error.message, details: error.details}));
    };

    return (
        <div className="background-container page-background d-flex justify-content-center align-items-center mt-5">
            <div className="card col-sm-3 border-dark text-left">
                <Form onSubmit={onSubmitForm} className={"card-body"}>
                    <h1>Add restaurant</h1>
                    <FormErrorMessage error={errorMessage}/>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Name</InputGroup.Text>
                        <FormControl type={"text"} name={"name"} onChange={onInputChange} required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Delivery fee</InputGroup.Text>
                        <FormControl type={"text"} name={"delivery_fee"} onChange={onInputChange}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3 md-3"}>
                        <InputGroup.Text><BsStar/> Rating</InputGroup.Text>
                        <FormControl type={"text"} name={"rating"} onChange={onInputChange} required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Opening hour</InputGroup.Text>
                        <FormControl type={"text"} name={"schedule.opening_hour"} onChange={onInputChange}
                                     required></FormControl>
                        <InputGroup.Text>Closing hour</InputGroup.Text>
                        <FormControl type={"text"} name={"schedule.closing_hour"} onChange={onInputChange}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Tags</InputGroup.Text>
                        <FormControl type={"text"} name={"tags"} onChange={onInputChange} required></FormControl>
                    </InputGroup>
                    <AddressInput onInputChange={onAddressChange}/>
                    <div className="text-center">
                        <Button type={"submit"}>Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};