import React, {useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {BsStar} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {FormErrorMessage} from "../FormErrorMesage";
import {AddressInput} from "../cart/AddressInput";
import {editRestaurant} from "../../api/restaurantApi";

export const EditableRestaurant = (props) => {
    const [name, setName] = useState(props.restaurant.name);
    const [deliveryFee, setDeliveryFee] = useState(props.restaurant.delivery_fee);
    const [rating, setRating] = useState(props.restaurant.rating);
    const [address, setAddress] = useState(props.restaurant.address);
    const [schedule, setSchedule] = useState(props.restaurant.schedule);
    const [tags, setTags] = useState(props.restaurant.tags);
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
                    <h1>Edit restaurant</h1>
                    <FormErrorMessage error={errorMessage}/>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Name</InputGroup.Text>
                        <FormControl type={"text"} name={"name"} value={name} onChange={setName} required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Delivery fee</InputGroup.Text>
                        <FormControl type={"text"} name={"delivery_fee"} value={deliveryFee}
                                     onChange={e => setDeliveryFee(parseFloat(e.target.value))}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3 md-3"}>
                        <InputGroup.Text><BsStar/> Rating</InputGroup.Text>
                        <FormControl type={"text"} name={"rating"} value={rating}
                                     onChange={e => setRating(parseFloat(e.target.value))}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Opening hour</InputGroup.Text>
                        <FormControl type={"text"} name={"opening_hour"} value={schedule.opening_hour.toString()}
                                     onChange={e => setSchedule({
                                         ...schedule,
                                         opening_hour: parseInt(e.target.value)
                                     })}
                                     required></FormControl>
                        <InputGroup.Text>Closing hour</InputGroup.Text>
                        <FormControl type={"text"} name={"closing_hour"} value={schedule.closing_hour.toString()}
                                     onChange={e => setSchedule({
                                         ...schedule,
                                         closing_hour: parseInt(e.target.value)
                                     })}
                                     required></FormControl>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <InputGroup.Text>Tags</InputGroup.Text>
                        <FormControl type={"text"} name={"tags"} value={tags.toString()}
                                     onChange={e => setTags(e.target.value.split(",").map(s => s.trim()))}
                                     required></FormControl>
                    </InputGroup>
                    <AddressInput data={address} onInputChange={e => setAddress({
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