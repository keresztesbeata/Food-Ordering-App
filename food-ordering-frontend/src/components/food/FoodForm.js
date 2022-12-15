import React, {useEffect, useState} from "react";
import {Button, Dropdown, Form, FormControl, InputGroup} from "react-bootstrap";
import {addFood, editFood, getCategoriesList} from "../../api/foodsApi";
import {FormMessage} from "../FormMesage";
import {getSessionItem, SESSION_KEY} from "../../api/utils";

export const FoodForm = (props) => {
    const id = props.food !== null ? props.food._id : null;
    const restaurant = getSessionItem(SESSION_KEY.RESTAURANT_KEY);
    const [name, setName] = useState(props.food !== null ? props.food.name : "");
    const [ingredients, setIngredients] = useState(props.food !== null ? props.food.ingredients : "");
    const [portionSize, setPortionSize] = useState(props.food !== null ? props.food.portion_size : 0);
    const [price, setPrice] = useState(props.food !== null ? props.food.price : 0);
    const [category, setCategory] = useState(props.food !== null ? props.food.category : "");
    const [formMessage, setFormMessage] = useState(null);
    const [allCategories, setAllCategories] = useState([]);

    const displayCategories = () => {
        return allCategories.map(c =>
            <Dropdown.Item as={"button"} value={c}
                           onClick={(event) => {
                               event.preventDefault();
                               setCategory(event.target.value);
                           }}>{c}
            </Dropdown.Item>)
    }

    const clearForm = () => {
        setName("");
        setIngredients([]);
        setPortionSize(0);
        setPrice(0);
        setCategory("");
    }

    const onSubmitForm = e => {
        e.preventDefault();

        const form = {
            name: name,
            ingredients: ingredients,
            portion_size: portionSize,
            price: price,
            category: category
        };

        (id === null ? addFood(restaurant.name, form) : editFood(id, form))
            .then(data => {
                setFormMessage({message: "Success!", details: `The food ${data.name} has been successfully saved!`, isError: false});
                clearForm();
            })
            .catch(error => setFormMessage({message: error.message, details: error.details, isError: true}));

        props.onRefresh();
    };

    useEffect(() => {
        setName(props.food !== null ? props.food.name : "");
        setIngredients(props.food !== null ? props.food.ingredients : "");
        setPortionSize(props.food !== null ? props.food.portion_size : 0);
        setPrice(props.food !== null ? props.food.price : 0);
        setCategory(props.food !== null ? props.food.category : "");
        getCategoriesList()
            .then(data => setAllCategories(data))
            .catch(error => console.log(error));
    }, [props.food]);

    return (
        props.hidden ?
            <div/>
            :
            <div
                className="modal background-container page-background d-flex justify-content-center align-items-center mt-5">
                <div className="card col-sm-3 border-dark text-left">
                    <Form onSubmit={onSubmitForm} className={"card-body"}>
                        <h1>Food Form</h1>
                        <FormMessage data={formMessage}/>
                        <InputGroup>
                            <InputGroup.Text>Name:</InputGroup.Text>
                            <FormControl type={"text"} name={"name"} value={name}
                                         onChange={(event) => setName(event.target.value)}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>Category:</InputGroup.Text>
                            <Dropdown>
                                <Dropdown.Toggle variant={"success"}>
                                    {category}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant={"success"}>
                                    {displayCategories()}
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>PortionSize:</InputGroup.Text>
                            <FormControl type={"text"} name={"portionSize"} value={portionSize}
                                         onChange={(event) => setPortionSize(event.target.value)}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>Price:</InputGroup.Text>
                            <FormControl type={"text"} name={"price"} value={price}
                                         onChange={(event) => setPrice(event.target.value)}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>Ingredients:</InputGroup.Text>
                            <FormControl type={"text"} name={"ingredients"} value={ingredients}
                                         onChange={(event) => setIngredients(event.target.value)}/>
                        </InputGroup>
                        <div className="text-center m-3 gap-3">
                            <Button type={"submit"} variant={"success"}>Save</Button>
                            <Button onClick={() => {
                                setFormMessage("");
                                props.setHidden(true);
                            }} variant={"secondary"}>Close</Button>
                        </div>
                    </Form>
                </div>
            </div>
    );
};