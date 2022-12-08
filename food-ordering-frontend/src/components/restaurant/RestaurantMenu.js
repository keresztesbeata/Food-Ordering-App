import React, {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import {RestaurantInfo} from "./RestaurantInfo";
import {Menu} from "../food/Menu";


const initRestaurants = [{
    "_id": "6388be157a96fb6e669cc7b3",
    "name": "Napoli",
    "owner": "6388721501aa5086b4dc0c40",
    "address": {
        "city": "Cluj-Napoca",
        "street": "str. Restaurantelor",
        "nr": 1
    },
    "delivery_fee": 15.5,
    "schedule": {
        "opening_hour": 10,
        "closing_hour": 18
    },
    "tags": [
        "italian",
        "pasta",
        "pizza",
        "family"
    ],
    "rating": 4.5
}];

const allFoods = [
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

export const RestaurantMenu = () => {
    const allRestaurants = initRestaurants;
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);

    const onSelectRestaurant = (event) => {
        const name = event.target.id;
        const selectedRestaurant = allRestaurants.filter(item => item.name === name)[0];
        setRestaurant(selectedRestaurant);
    }

    useEffect(() => {
        // todo: filter foods by the selected restaurant
        if (restaurant === null) {
            setMenu([]);
        } else {
            setMenu(allFoods);
        }
    }, [restaurant, onSelectRestaurant]);

    const displayRestaurants = () => {
        return allRestaurants.map(restaurant =>
            <Dropdown.Item as={"button"} id={restaurant.name} key={restaurant.name}
                           onClick={onSelectRestaurant}>{restaurant.name}
            </Dropdown.Item>)
    }

    const displayRestaurantInfo = () => {
        return restaurant !== null ?
            <RestaurantInfo data={restaurant}/>
            :
            <p>No restaurant has been selected!</p>
    }

    return (
        <div className="flex justify-content-center align-items-center m-auto w-75">
            <Dropdown>
                <Dropdown.Toggle variant={"success"}>
                    Select a restaurant
                </Dropdown.Toggle>
                <Dropdown.Menu variant={"success"}>
                    {displayRestaurants()}
                </Dropdown.Menu>
            </Dropdown>
            {displayRestaurantInfo()}
            <Menu menu={menu}/>
        </div>
    );
}
