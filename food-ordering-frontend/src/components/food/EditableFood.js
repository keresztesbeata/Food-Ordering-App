import React, {useState} from "react";
import {Button, Dropdown, Form, FormControl, InputGroup} from "react-bootstrap";

export const EditableFood = (props) => {
    const [name, setName] = useState(props.food.name);
    const [ingredients, setIngredients] = useState(props.food.ingredients);
    const [portionSize, setPortionSize] = useState(props.food.portionSize);
    const [price, setPrice] = useState(props.food.price);
    const [category, setCategory] = useState(props.food.category);
    const [allCategories, setAllCategories] = useState(props.categories);

    const displayCategories = () => {
        return allCategories.map(category =>
            <Dropdown.Item as={"button"} value={category}
                           onClick={(event) => setCategory(event.target.value)}>{category}
            </Dropdown.Item>)
    }

    return (
        <Form>
            <InputGroup>
                <InputGroup.Text>Name:</InputGroup.Text>
                <FormControl type={"text"} name={"name"} value={name}
                             onChange={(event) => setName(event.target.value)}/>
            </InputGroup>
            <InputGroup.Text>Category:</InputGroup.Text>
            <Dropdown>
                <Dropdown.Toggle variant={"success"}>
                    {category}
                </Dropdown.Toggle>
                <Dropdown.Menu variant={"success"}>
                    {displayCategories()}
                </Dropdown.Menu>
            </Dropdown>
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
                <FormControl type={"text"} name={"price"} value={ingredients}
                             onChange={(event) => setIngredients(event.target.value)}/>
            </InputGroup>
            <Button type={"submit"} variant={"success"}>Save</Button>
        </Form>
    );
};