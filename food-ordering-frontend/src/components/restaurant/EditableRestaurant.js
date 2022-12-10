import React, {useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {BsStar} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {FormErrorMessage} from "../FormErrorMesage";
import {AddressInput} from "../cart/AddressInput";
import {addRestaurant} from "../../api/restaurantApi";

export const EditableRestaurant = () => {
    const [name, setName] = useState("");
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [rating, setRating] = useState(0);
    const [address, setAddress] = useState({
        address: {
            city: "",
            street: "",
            nr: 0
        }
    });
    const [schedule, setSchedule] = useState({
        opening_hour: 0,
        closing_hour: 0
    });
    const [tags, setTags] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onSubmitForm = e => {
        e.preventDefault();
        const form = {
            name: name,
            address: address,
            delivery_fee: deliveryFee,
            tags: tags,
            schedule: schedule,
            rating: rating
        }
        editRestaurant(form)
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
                        <FormControl type={"text"} name={"name"} onChange={setName} required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Delivery fee</InputGroup.Text>
                        <FormControl type={"text"} name={"delivery_fee"}
                                     onChange={e => setDeliveryFee(parseFloat(e.target.value))}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3 md-3"}>
                        <InputGroup.Text><BsStar/> Rating</InputGroup.Text>
                        <FormControl type={"text"} name={"rating"}
                                     onChange={e => setRating(parseFloat(e.target.value))}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Opening hour</InputGroup.Text>
                        <FormControl type={"text"} name={"opening_hour"} onChange={e => setSchedule({
                            ...schedule,
                            opening_hour: parseInt(e.target.value)
                        })}
                                     required></FormControl>
                        <InputGroup.Text>Closing hour</InputGroup.Text>
                        <FormControl type={"text"} name={"closing_hour"} onChange={e => setSchedule({
                            ...schedule,
                            closing_hour: parseInt(e.target.value)
                        })}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Tags</InputGroup.Text>
                        <FormControl type={"text"} name={"tags"}
                                     onChange={e => setTags(e.target.value.split(",").map(s => s.trim()))}
                                     required></FormControl>
                    </InputGroup>
                    <AddressInput onInputChange={e => setAddress({
                        ...address,
                        [e.target.name]: e.target.value
                    })}/>
                    <div className="text-center">
                        <Button type={"submit"}>Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};