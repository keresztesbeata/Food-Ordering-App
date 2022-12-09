import React, {useEffect, useState} from "react";
import {Button, Dropdown, FormControl, InputGroup} from "react-bootstrap";
import {RestaurantsList} from "./RestaurantsList";
import {getAllRestaurants, getRestaurantByName, getRestaurantsByTags} from "../../api/restaurantApi";
import {Notification, NOTIFICATION_TYPES} from "../Notification";
import {RestaurantItem} from "./RestaurantItem";
import {Menu} from "../food/Menu";

export const RestaurantMenu = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [tags, setTags] = useState("");
    const [name, setName] = useState("");
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
            <p>No restaurant has been selected!</p>
    }

    return (
        <div className="flex justify-content-center align-items-center m-auto w-75">
            <Notification data={notification}/>
            <Button onClick={onResetFilters} variant={"secondary"}>Reset filters</Button>
            <div className={"d-flex flex-row gap-3 mb-3 mt-3"}>
                <InputGroup>
                    <InputGroup.Text>Select a restaurant:</InputGroup.Text>
                    <Dropdown>
                        <Dropdown.Toggle variant={"success"}>
                            {name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant={"success"}>
                            {displayRestaurantsDropdown()}
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Search restaurant by tags:</InputGroup.Text>
                    <FormControl type={"text"} name={"tag"} value={tags}
                                 onChange={(event) => setTags(event.target.value)}/>
                    <Button onClick={onSearchRestaurantByTag} variant={"success"}>Search</Button>
                </InputGroup>
            </div>
            {restaurant !== null ?
                <RestaurantItem data={restaurant} disable/>
                :
                displayRestaurantsList()}
            <Menu restaurant={restaurant} onNotification={setNotification}/>
        </div>
    );
}
