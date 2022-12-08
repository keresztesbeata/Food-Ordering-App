import React, {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import {FoodsList} from "./FoodsList";

const foods = [
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

const allCategories = ["All", "Appetizers", "Pizza", "Pasta", "Soup", "Dessert", "Main"];

export const Menu = () => {
    const [category, setCategory] = useState("All");
    const [allItems, setAllItems] = useState(foods);

    useEffect(() => {
        if (category === "All") {
            setAllItems(foods);
        } else {
            const filteredItems = foods.filter((item) => item.category === category);
            setAllItems(filteredItems);
        }
    }, [category]);

    const onSelectCategory = (event) => {
        setCategory(event.target.value);
    }

    const displayCategories = () => {
        return allCategories.map(category =>
            <Dropdown.Item as={"button"} value={category} key={category}
                           onClick={onSelectCategory}>{category}
            </Dropdown.Item>)
    }

    const displayFoods = () => {
        return category === "All" ?
            allCategories.filter(category => category !== "All")
                .map(c => {
                    const filteredItems = allItems.filter(foodData => foodData.category === c);
                    return filteredItems.length > 0 ?
                        <FoodsList data={filteredItems} category={c}/>
                        :
                        <div/>
                })
            :
            allItems.length > 0 ?
                <FoodsList data={allItems} category={category}/>
                :
                <p>No foods exist in the category {category}!</p>
    }

    return (
        <div className="flex justify-content-center align-items-center m-auto w-75">
            <Dropdown>
                <Dropdown.Toggle variant={"success"}>
                    {category}
                </Dropdown.Toggle>
                <Dropdown.Menu variant={"success"}>
                    {displayCategories()}
                </Dropdown.Menu>
            </Dropdown>
            {displayFoods()}
        </div>
    );
}
