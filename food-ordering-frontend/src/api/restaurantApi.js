import axios from "axios";
import {BASE_URL, customError, getSessionItem, isAdmin, isLoggedIn, SESSION_KEY, setSessionItem} from "./utils";

const RESTAURANTS_URL = BASE_URL + "/restaurants";

export function getAllRestaurants() {
    return axios.get(RESTAURANTS_URL, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError("Failed to fetch all restaurants!", error.response.data);
        })
}

export function getOpenRestaurants() {
    const url = RESTAURANTS_URL + "/open";
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError( "Failed to fetch open restaurants!", error.response.data);
        })
}

export function getRestaurantByOwner(ownerId) {
    const url = RESTAURANTS_URL + "/owner/" + ownerId;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved restaurant ${data.name} by id ${ownerId}!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch restaurant by owner id ${ownerId}!`, error.response.data);
        })
}

export function getRestaurantById(id) {
    const url = RESTAURANTS_URL + "/id/" + id;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved restaurant ${data.name} by id ${id}!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch restaurant by id ${id}!`, error.response.data);
        })
}

export function getRestaurantByName(restaurantName) {
    const url = RESTAURANTS_URL + "/name/" + restaurantName;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved restaurant ${restaurantName}!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch restaurants by name ${restaurantName}!`, error.response.data);
        })
}

export function getRestaurantsByTags(tags) {
    const url = RESTAURANTS_URL + "/tags";
    // extract the list of tags from the string
    const tagsList = {
        tags: tags.split(",").map(s => s.trim())
    };
    console.log(tagsList)
    return axios.post(url, tagsList, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch restaurant by tags ${tags}!`, error.response.data);
        })
}

export function addRestaurant(restaurantData) {
    if (!isLoggedIn()) {
        throw customError("Adding restaurant failed!", `No logged in user!`);
    }
    if (!isAdmin()) {
        throw customError("Not authorized!", "Only admins can add a restaurant!");
    }
    const owner = getSessionItem(SESSION_KEY.USER_KEY);
    restaurantData["owner"] = owner._id;

    return axios.post(RESTAURANTS_URL, restaurantData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully added restaurant ${data.name}!`);
            setSessionItem(SESSION_KEY.RESTAURANT_KEY, data);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError( `Failed to add restaurant ${restaurantData.name}!`, error.response.data);
        })
}

export function editRestaurant(restaurantData) {
    if (!isLoggedIn()) {
        throw customError("Editing restaurant failed!", `No logged in user!`);
    }
    if (!isAdmin()) {
        throw customError("Not authorized!", "Only the admin can edit the restaurant!");
    }
    const id = getSessionItem(SESSION_KEY.RESTAURANT_KEY)._id;
    console.log(id)
    const url = RESTAURANTS_URL + "/id/" + id;

    return axios.post(url, restaurantData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully updated restaurant ${data.name}!`);
            setSessionItem(SESSION_KEY.RESTAURANT_KEY, data);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to update restaurant ${restaurantData.name}!`, error.response.data);
        })
}
