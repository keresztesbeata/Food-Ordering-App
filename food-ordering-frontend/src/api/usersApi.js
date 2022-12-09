import {BASE_URL, customError} from "./Utils";
import axios from "axios";

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
            sessionStorage.setItem("user", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError(`Wrong credentials!`, error.message);
        });
}

export function register(userData) {
    return axios.post(USERS_URL, userData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully registered ${data.credentials.username} user!`);
            sessionStorage.setItem("user", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError(`Failed to register user!`, `Invalid data!` + error.message);
        });
}

export function editUser(userData) {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser === null) {
        throw customError("Updating user failed!", `No logged in user!`);
    }
    if (loggedInUser.role !== "CUSTOMER") {
        throw customError("Not authorized!", "Only customers can add personal information to their accounts!");
    }
    const url = USERS_URL + "/edit/" + loggedInUser._id;
    return axios.post(url, userData)
        .then(result => {
            const data = result.data;
            console.log(`Successfully updated ${data.credentials.username} user!`);
            sessionStorage.setItem("user", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.log(error.message);
            throw customError(`Failed to update user!`, `Invalid data!` + error.message);
        });
}