import {BASE_URL, customError} from "./utils";
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
            console.log(error.response.data);
            throw customError(`Failed to fetch foods for restaurant ${restaurantName}!`, error.response.data);
        });
}

export function getFoodsByRestaurantAndCategory(restaurantName, category) {
    const url = FOODS_URL + "/" + restaurantName + "/category/" + category;
    return axios.get(url, {})
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} foods!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch foods for restaurant ${restaurantName} and category ${category}!`, error.response.data);
        });
}

export function getFoodsByRestaurantAndIngredients(restaurantName, ingredients) {
    const url = FOODS_URL + "/" + restaurantName + "/ingredients";
    const data = {
        ingredients: ingredients.split(",").map(s => s.trim())
    };
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} foods!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch foods for restaurant ${restaurantName} and ingredients list ${ingredients}!`, error.response.data);
        });
}

export function getCategoriesList() {
    const url = BASE_URL + "/categories";
    return axios.get(url)
        .then(result => {
            const data = result.data;
            console.log(`Successfully retrieved ${data.length} categories!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to fetch categories!`, error.response.data);
        });
}

export function addFood(restaurantName, foodData) {
    const url = FOODS_URL + "/" + restaurantName;
    return axios.post(url, foodData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            const data = result.data;
            console.log(`Successfully created food with id ${data._id} and name ${data.name}!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to insert foods for restaurant ${restaurantName}!`, error.response.data);
        });
}

export function editFood(id, foodData) {
    const url = FOODS_URL + "/id/" + id;
    return axios.post(url, foodData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            const data = result.data;
            console.log(`Successfully updated food with id ${data._id} and name ${data.name}!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to update food with name ${foodData.name}!`, error.response.data);
        });
}

export function deleteFood(id) {
    const url = FOODS_URL + "/id/" + id;
    return axios.delete(url)
        .then(result => {
            const data = result.data;
            console.log(`Successfully deleted food with id ${data._id} and name ${data.name}!`);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to delete food with id ${id}!`, error.response.data);
        });
}