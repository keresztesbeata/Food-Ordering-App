import {BASE_URL, customError} from "./Utils";
import axios from "axios";

const FOODS_URL = BASE_URL + "/foods";

export function getFoodsByRestaurant(restaurantName) {
    const url = FOODS_URL + "/" + restaurantName;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} foods!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch foods for restaurant ${restaurantName}!`);
        });
}

export function getFoodsByRestaurantAndCategory(restaurantName, category) {
    const url = FOODS_URL + "/" + restaurantName + "/category/" + category;
    console.log(url)
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} foods!`);
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!", `Failed to fetch foods for restaurant ${restaurantName} and catgeory ${category}!`);
        });
}