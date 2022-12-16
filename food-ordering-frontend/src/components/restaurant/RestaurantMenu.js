import React, {useEffect, useState} from "react";
import {Button, Dropdown, FormControl, InputGroup} from "react-bootstrap";
import {RestaurantsList} from "./RestaurantsList";
import Form from 'react-bootstrap/Form';
import {
    getAllRestaurants,
    getOpenRestaurants,
    getRestaurantByName,
    getRestaurantsByTags
} from "../../api/restaurantApi";
import {Notification, NOTIFICATION_TYPES} from "../Notification";
import {RestaurantItem} from "./RestaurantItem";
import {Menu} from "../food/Menu";
import {BsShop} from "react-icons/bs";

export const RestaurantMenu = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [tags, setTags] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState({show: false, message: "", type: NOTIFICATION_TYPES.ERROR});

    const selectAllRestaurants = () => {
        getAllRestaurants()
            .then(data => setAllRestaurants(data))
            .catch(error =>
                setNotification({
                    show: true,
                    message: error.message,
                    type: NOTIFICATION_TYPES.ERROR
                }));
    }

    const onSearchRestaurantByTag = () => {
        console.log("Search restaurants by tags: ", tags);
        if (tags.length > 0) {
            getRestaurantsByTags(tags)
                .then(data => setAllRestaurants(data))
                .catch(error => setNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR}));
        } else {
            selectAllRestaurants();
        }
    }

    useEffect(() => {
        if (tags.length === 0) {
            selectAllRestaurants();
        }
    }, [tags, setTags]);

    useEffect(() => {
        if (name.length > 0) {
            getRestaurantByName(name)
                .then(data => setRestaurant(data))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    type: NOTIFICATION_TYPES.ERROR
                }));
        } else {
            selectAllRestaurants();
        }
    }, [name, setName]);

    const onResetFilters = () => {
        setTags("");
        setName("");
        setRestaurant(null);
    }

    const displayRestaurantsDropdown = () => {
        return allRestaurants.map(restaurant =>
            <Dropdown.Item as={"button"} id={restaurant.name} key={restaurant.name}
                           onClick={event => setName(event.target.id)}>{restaurant.name}
            </Dropdown.Item>)
    }

    const displayRestaurantsList = () => {
        return allRestaurants.length > 0 ?
            <RestaurantsList data={allRestaurants} onSelect={setName}/>
            :
            <p>No restaurant has been found!</p>
    }

    useEffect(() => {
        if (open) {
            getOpenRestaurants()
                .then(data => setAllRestaurants(data))
                .catch(error => setNotification({
                    show: true,
                    message: error.message,
                    type: NOTIFICATION_TYPES.ERROR
                }));
        } else {
            selectAllRestaurants();
        }
    }, [open, setOpen]);

    return (
        <div className="flex justify-content-center align-items-center m-auto w-75">
            <Notification data={notification}/>
            <h1><BsShop/> Restaurant</h1><hr/>
            <Button onClick={onResetFilters} variant={"secondary"}>Reset filters</Button>
            <Form.Check
                type="switch"
                label="Show only currently open restaurants"
                value={open ? "true" : "false"}
                className={"mt-3"}
                onClick={() => setOpen(!open)}
            />
            <div className={"d-flex flex-row gap-3 mb-3 mt-3"}>
                <InputGroup>
                    <InputGroup.Text>Search restaurant by tags:</InputGroup.Text>
                    <FormControl type={"text"} name={"tag"} value={tags}
                                 onChange={(event) => setTags(event.target.value)}/>
                    <Button onClick={onSearchRestaurantByTag} variant={"success"}>Search</Button>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Select a restaurant:</InputGroup.Text>
                    <Dropdown>
                        <Dropdown.Toggle variant={"success"}>
                            {name.length > 0 ? name : "Select..."}
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant={"success"}>
                            {displayRestaurantsDropdown()}
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
            </div>
            {restaurant !== null ?
                <RestaurantItem data={restaurant} disable/>
                :
                displayRestaurantsList()}
            <Menu restaurant={restaurant}/>
        </div>
    );
}
