import React, {useEffect, useState} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {FoodsList} from "./FoodsList";
import {getFoodsByRestaurant} from "../../api/foodsApi";
import {Notification, NOTIFICATION_TYPES} from "../Notification";

const allCategories = ["All", "Appetizers", "Pizza", "Pasta", "Soup", "Dessert", "Main"];

const initFoods = [
    {
        _id: "1",
        name: "Pizza 1",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        _id: "2",
        name: "Pizza 2",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        _id: "3",
        name: "Pizza 3",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        _id: "4",
        name: "Pizza 4",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        _id: "5",
        name: "Pizza 5",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        _id: "6",
        name: "Pizza 6",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        _id: "7",
        name: "Pasta 1",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pasta"
    }, {
        _id: "8",
        name: "Pasta 2",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pasta"
    }, {
        _id: "9",
        name: "Pasta 3",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pasta"
    }, {
        _id: "10",
        name: "Pasta 4",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pasta"
    }, {
        _id: "11",
        name: "Pasta 5",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pasta"
    }
];

export const Menu = (props) => {
    const [category, setCategory] = useState("All");
    const [allFoods, setAllFoods] = useState([]);
    const [ingredient, setIngredient] = useState("");

    useEffect(() => {
        getFoodsByRestaurant(props.restaurant)
            .then(data => setAllFoods(data))
            .catch(error => props.onNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR}))
    }, [props, props.restaurant]);

    // // useEffect for props.restaurant
    // useEffect(() => {
    //     // todo: fetch items based on category from backend
    //     const filteredItems = initFoods.filter((item) => item.category === category);
    //     setAllFoods(filteredItems);
    // }, [props.restaurant]);

    useEffect(() => {
        // todo: fetch items based on ingredient from backend
        const filteredItems = initFoods;
        setAllFoods(filteredItems);
    }, [ingredient, setIngredient]);

    const displayFoods = () => {
        return category === "All" ?
            allCategories.filter(category => category !== "All")
                .map(c => {
                    const filteredItems = allFoods.filter(foodData => foodData.category === c);
                    return filteredItems.length > 0 ?
                        <FoodsList data={filteredItems} category={c}/>
                        :
                        <div/>
                })
            :
            allFoods.length > 0 ?
                <FoodsList data={allFoods} category={category}/>
                :
                <p>No foods exist in the category {category}!</p>
    }

    const onSearchFoodsByCategory = () => {
        // call to backend to apply the filters
    }

    const onSearchFoodsByIngredient = () => {
        // call to backend to apply the filters
    }

    const onResetFilters = () => {
        setCategory("");
        setIngredient("");
        setAllFoods(initFoods); // todo: get from api
    }

    return (
        props.restaurant !== null ?
            <div>
                <Button onClick={onResetFilters} variant={"secondary"}>Reset filters</Button>
                <div className={"d-flex flex-row gap-3 mb-3 mt-3"}>
                    <InputGroup>
                        <InputGroup.Text>Search foods by category:</InputGroup.Text>
                        <FormControl type={"text"} name={"name"} value={category}
                                     onChange={(event) => setCategory(event.target.value)}/>
                        <Button onClick={onSearchFoodsByCategory} variant={"success"}>Search</Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Search foods by ingredient:</InputGroup.Text>
                        <FormControl type={"text"} name={"ingredient"} value={ingredient}
                                     onChange={(event) => setIngredient(event.target.value)}/>
                        <Button onClick={onSearchFoodsByIngredient} variant={"success"}>Search</Button>
                    </InputGroup>
                </div>
                {displayFoods()}
            </div>
            :
            <div/>
    );
}
