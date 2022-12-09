import React, {useState} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {Menu} from "../food/Menu";
import {RestaurantsList} from "./RestaurantsList";
import {
    getAllRestaurants,
    getRestaurantById,
    getRestaurantsByNameMatch,
    getRestaurantsByTag
} from "../../api/restaurantApi";
import {Notification, NOTIFICATION_TYPES} from "../Notification";

export const RestaurantMenu = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [tag, setTag] = useState("");
    const [name, setName] = useState("");
    const [notification, setNotification] = useState({show: false, message: "", type: NOTIFICATION_TYPES.ERROR});

    const onSelectRestaurant = (event) => {
        const id = event.target.id;
        getRestaurantById(id)
            .then(data => setRestaurant(data))
            .catch(error => setNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR}));
    }

    const onSearchRestaurantByName = () => {
        getRestaurantsByNameMatch(name)
            .then(data => setAllRestaurants(data))
            .catch(error => setNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR}));
    }

    const onSearchRestaurantByTag = () => {
        getRestaurantsByTag(tag)
            .then(data => setAllRestaurants(data))
            .catch(error => setNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR}));
    }

    const onResetFilters = () => {
        setTag("");
        setName("");
        setRestaurant(null);
        getAllRestaurants()
            .then(data => setAllRestaurants(data))
            .catch(error => setNotification({show: true, message: error.message, type: NOTIFICATION_TYPES.ERROR}));
    }

    const displayRestaurants = () => {
        return restaurant !== null ?
            <RestaurantsList data={allRestaurants} onSelect={onSelectRestaurant}/>
            :
            <p>No restaurant has been selected!</p>
    }

    return (
        <div className="flex justify-content-center align-items-center m-auto w-75">
            <Notification data={notification}/>
            <Button onClick={onResetFilters} variant={"secondary"}>Reset filters</Button>
            <div className={"d-flex flex-row gap-3 mb-3 mt-3"}>
                <InputGroup>
                    <InputGroup.Text>Search restaurant by name:</InputGroup.Text>
                    <FormControl type={"text"} name={"name"} value={name}
                                 onChange={(event) => setName(event.target.value)}/>
                    <Button onClick={onSearchRestaurantByName} variant={"success"}>Search</Button>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Search restaurant by tag:</InputGroup.Text>
                    <FormControl type={"text"} name={"tag"} value={tag}
                                 onChange={(event) => setTag(event.target.value)}/>
                    <Button onClick={onSearchRestaurantByTag} variant={"success"}>Search</Button>
                </InputGroup>
            </div>
            {displayRestaurants()}
           {/*// <Menu restaurant={restaurant} onNotification={setNotification}/>*/}
        </div>
    );
}
