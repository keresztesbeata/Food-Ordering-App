import axios from "axios";
import {BASE_URL, customError} from "./Utils";

const RESTAURANTS_URL = BASE_URL + "/restaurants";

export function getAllRestaurants() {
    return axios.get(RESTAURANTS_URL, {})
        .then(data => {
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", "Failed to fetch restaurants!");
        })
}

export function getRestaurantById(id) {
    const url = RESTAURANTS_URL + "/id" + id;
    return axios.get(url, {})
        .then(data => {
            console.log(`Successfully retrieved restaurant ${data.name} by id ${id}!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurant by id ${id}!`);
        })
}

export function getRestaurantsByNameMatch(restaurantName) {
    const url = RESTAURANTS_URL + "/matches/"+restaurantName;
    return axios.get(url, {})
        .then(data => {
            console.log(data)
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurants by name ${restaurantName}!`);
        })
}

export function getRestaurantsByTag(tag) {
    const url = RESTAURANTS_URL + "/tag/" +tag;
    return axios.get(url, {})
        .then(data => {
            console.log(`Successfully retrieved ${data.length} restaurants!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch restaurant by tag ${tag}!`);
        })
}