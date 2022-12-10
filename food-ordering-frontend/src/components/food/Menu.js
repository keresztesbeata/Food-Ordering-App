import React, {useEffect, useState} from "react";
import {Button, Dropdown, FormControl, InputGroup} from "react-bootstrap";
import {FoodsList} from "./FoodsList";
import {
    getFoodsByRestaurant,
    getFoodsByRestaurantAndCategory,
    getFoodsByRestaurantAndIngredients
} from "../../api/foodsApi";
import {Notification, NOTIFICATION_TYPES} from "../Notification";
import {BsBook} from "react-icons/bs";

export const Menu = (props) => {
    const [category, setCategory] = useState("All");
    const [allFoods, setAllFoods] = useState([]);
    const [ingredients, setIngredients] = useState("");
    const allCategories = ["All", "Appetizers", "Pizza", "Pasta", "Soup", "Dessert", "Main"];
    const [notification, setNotification] = useState({show: false, message: "", details: "", type: NOTIFICATION_TYPES.ERROR});

    const selectAllFoodsOfRestaurant = () => {
        if (props.restaurant !== null) {
            getFoodsByRestaurant(props.restaurant.name)
                .then(data => setAllFoods(data))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    details: error.details,
                    type: NOTIFICATION_TYPES.ERROR
                }));
        }
    }

    useEffect(() => {
        if (category === "All") {
            selectAllFoodsOfRestaurant();
        } else if (props.restaurant !== null) {
            getFoodsByRestaurantAndCategory(props.restaurant.name, category)
                .then(data => setAllFoods(data))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    details: error.details,
                    type: NOTIFICATION_TYPES.ERROR
                }))
        }
    }, [props.restaurant, category, setCategory]);

    const displayFoods = () => {
        return category === "All" ?
            allCategories.filter(category => category !== "All")
                .map(c => {
                    const filteredItems = allFoods.filter(foodData => foodData.category === c);
                    return filteredItems.length > 0 ?
                        <FoodsList data={filteredItems} category={c} setNotification={setNotification}/>
                        :
                        <div/>
                })
            :
            allFoods.length > 0 ?
                <FoodsList data={allFoods} category={category} setNotification={setNotification}/>
                :
                <p>No foods exist in the category {category}!</p>
    }

    const onSearchFoodsByIngredients = () => {
        console.log("Search restaurants by ingredients: ", ingredients);
        if (ingredients.length > 0) {
            getFoodsByRestaurantAndIngredients(props.restaurant.name, ingredients)
                .then(data => setAllFoods(data))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    details: error.details,
                    type: NOTIFICATION_TYPES.ERROR
                }));
        } else {
            selectAllFoodsOfRestaurant();
        }
    }

    const onResetFilters = () => {
        setCategory("All");
        setIngredients("");
    }

    const displayCategories = () => {
        return allCategories.map(category =>
            <Dropdown.Item as={"button"} value={category}
                           onClick={(event) => setCategory(event.target.value)}>{category}
            </Dropdown.Item>)
    }

    return (
        props.restaurant !== null ?
            <div className={"mt-3"}>
                <h1><BsBook/> Menu</h1>
                <hr/>
                <Notification data={notification}/>
                <Button onClick={onResetFilters} variant={"secondary"}>Reset filters</Button>
                <div className={"d-flex flex-row gap-3 mb-3 mt-3"}>
                    <InputGroup>
                        <InputGroup.Text>Search foods by ingredient:</InputGroup.Text>
                        <FormControl type={"text"} name={"ingredient"} value={ingredients}
                                     onChange={(event) => setIngredients(event.target.value)}/>
                        <Button onClick={onSearchFoodsByIngredients} variant={"success"}>Search</Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Search foods by category:</InputGroup.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant={"success"}>
                                {category}
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant={"success"}>
                                {displayCategories()}
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </div>
                {displayFoods()}
            </div>
            :
            <div/>
    );
}
