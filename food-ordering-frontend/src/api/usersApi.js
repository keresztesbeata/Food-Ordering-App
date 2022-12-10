import {
    BASE_URL,
    clearSession,
    customError,
    getSessionItem,
    isAdmin,
    isLoggedIn,
    SESSION_KEY,
    setSessionItem
} from "./utils";
import axios from "axios";
import {getRestaurantByOwner} from "./restaurantApi";

const USERS_URL = BASE_URL + "/users";

export function login(username, password) {
    const url = USERS_URL + "/perform_login";
    const userData = {
        username: username,
        password: password
    };
    return axios.post(url, userData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully logged in user ${data.credentials.username}!`);
            setSessionItem(SESSION_KEY.USER_KEY, data);
            if (isAdmin()) {
                getRestaurantByOwner(data.credentials.username)
                    .then(result => {
                        const restaurant = result.data;
                        setSessionItem(SESSION_KEY.RESTAURANT_KEY, restaurant);
                    });
            }
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Wrong credentials!`, error.response.data);
        });
}

export function register(userData) {
    return axios.post(USERS_URL, userData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully registered ${data.credentials.username} user!`);
            setSessionItem(SESSION_KEY.USER_KEY, data);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to register user!`, error.response.data);
        });
}

export function editUser(userData) {
    if (!isLoggedIn()) {
        throw customError("Updating user failed!", `No logged in user!`);
    }
    if (isAdmin()) {
        throw customError("Not authorized!", "Only customers can add personal information to their accounts!");
    }
    const loggedInUser = getSessionItem(SESSION_KEY.USER_KEY);
    const url = USERS_URL + loggedInUser._id;
    return axios.post(url, userData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully updated ${data.credentials.username} user!`);
            setSessionItem(SESSION_KEY.USER_KEY, data);
            return data;
        })
        .catch(error => {
            console.log(error.response.data);
            throw customError(`Failed to update user!`, error.response.data);
        });
}


export function logout() {
    if (!isLoggedIn()) {
        throw customError("Failed to log out!", "You were not logged in!");
    }
    clearSession();
}