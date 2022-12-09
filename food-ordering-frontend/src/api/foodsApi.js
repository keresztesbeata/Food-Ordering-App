import {BASE_URL, customError} from "./Utils";
import axios from "axios";

const FOODS_URL = BASE_URL + "/foods";

export function getFoodsByRestaurant(restaurantName) {
    const url = FOODS_URL + "/" + restaurantName;
    return axios.get(url, {})
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error.message);
            throw customError("Failed to load data!",`Failed to fetch foods for restaurant ${restaurantName}!`);
        })
}