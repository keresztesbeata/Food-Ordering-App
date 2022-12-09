import axios from "axios";
import {BASE_URL, customError} from "./Utils";

const RESTAURANTS_URL = BASE_URL + "/restaurants";

export function getAllRestaurants() {
    return axios.get(RESTAURANTS_URL, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", "Failed to fetch all restaurants!");
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
            console.log(error.message);
            throw customError("Failed to load data!", "Failed to fetch open restaurants!");
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
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurant by owner id ${ownerId}!`);
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
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurant by id ${id}!`);
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
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurants by name ${restaurantName}!`);
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
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurant by tags ${tags}!`);
        })
}

export function addRestaurant(restaurantData) {
    const owner = sessionStorage.getItem('user');
    if(owner === null) {
        throw customError("Adding restaurant failed!", `No logged in user!`);
    }
    if(owner.role !== "ADMIN") {
        throw customError("Not authorized!", "Only admins can add a restaurant!");
    }
    restaurantData["owner"] = owner.credentials.username;
    return axios.post(RESTAURANTS_URL, restaurantData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully added restaurant ${data.name}!`);
            sessionStorage.setItem("restaurant", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Insert failed!", `Failed to add restaurant ${restaurantData.name}!`);
        })
}
