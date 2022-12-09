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
            throw customError("Failed to load data!", "Failed to fetch restaurants!");
        })
}

export function getRestaurantById(id) {
    const url = RESTAURANTS_URL + "/id" + id;
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
    const tagsList = JSON.stringify({
        tags: tags.split(",")
    });
    console.log(tagsList);
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