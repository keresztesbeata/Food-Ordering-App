import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {BsStar} from "react-icons/bs";
import {FormMessage} from "../FormMesage";
import {AddressInput} from "../cart/AddressInput";
import {addRestaurant, editRestaurant} from "../../api/restaurantApi";

export const RestaurantForm = (props) => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [rating, setRating] = useState(0);
    const [address, setAddress] = useState({
        city: "",
        street: "",
        nr: 0
    });
    const [schedule, setSchedule] = useState({
        opening_hour: 0,
        closing_hour: 0
    });
    const [tags, setTags] = useState([]);
    const [formMessage, setFormMessage] = useState(null);

    useEffect(() => {
        if(props.restaurant) {
            setId(props.restaurant._id);
            setName(props.restaurant.name);
            setDeliveryFee(props.restaurant.delivery_fee);
            setRating(props.restaurant.rating);
            setAddress(props.restaurant.address);
            setSchedule(props.restaurant.schedule);
            setTags(props.restaurant.tags);
        }
    }, [props.restaurant]);

    const onSubmitForm = e => {
        e.preventDefault();
        const form = {
            name: name,
            address: address,
            delivery_fee: deliveryFee,
            tags: tags,
            schedule: schedule,
            rating: rating
        };

        (id === null ? addRestaurant(form) : editRestaurant(id, form))
            .then(() => setFormMessage({message: "Successfully saved restaurant!", details: "", isError: false}))
            .catch(error => setFormMessage({message: error.message, details: error.details, isError: true}));
    };

    return (
        <Form onSubmit={onSubmitForm} className={"card-body"}>
            <h1>Restaurant Form</h1>
            <FormMessage data={formMessage}/>
            <InputGroup className={"mb-3"}>
                <InputGroup.Text>Name</InputGroup.Text>
                <FormControl type={"text"} name={"name"} value={name}
                             onChange={e => setName(e.target.value)}
                             required></FormControl>
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
                <FormControl type={"text"} name={"opening_hour"} value={schedule.opening_hour}
                             onChange={e => setSchedule({
                                 ...schedule,
                                 opening_hour: parseInt(e.target.value)
                             })}
                             required></FormControl>
                <InputGroup.Text>Closing hour</InputGroup.Text>
                <FormControl type={"text"} name={"closing_hour"} value={schedule.closing_hour}
                             onChange={e => setSchedule({
                                 ...schedule,
                                 closing_hour: parseInt(e.target.value)
                             })}
                             required></FormControl>
            </InputGroup>
            <InputGroup className={"mb-3"}>
                <InputGroup.Text>Tags</InputGroup.Text>
                <FormControl type={"text"} name={"tags"} value={tags}
                             onChange={e => setTags(e.target.value.split(",").map(s => s.trim()))}
                             required></FormControl>
            </InputGroup>
            <AddressInput onInputChange={e => setAddress(prevState => {
                return {
                ...prevState,
                [e.target.name]: e.target.value
            }})} address={address}/>
            <div className="text-center">
                <Button type={"submit"} variant={"success"} >Save</Button>
            </div>
        </Form>
    );
};