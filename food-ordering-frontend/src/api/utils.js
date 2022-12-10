export const BASE_URL = "http://localhost:5000";

export function customError(message, details) {
    let error = new Error(message);
    error.details = details;
    throw error;
}

export const USER_ROLE = {
    ADMIN: "ADMIN",
    CUSTOMER: "CUSTOMER"
}

export function isLoggedIn() {
    return getSessionItem(SESSION_KEY.USER_KEY) != null;
}

export function isAdmin() {
    const loggedInUser = getSessionItem(SESSION_KEY.USER_KEY);
    return loggedInUser !== null && loggedInUser.role === USER_ROLE.ADMIN;
}

export const SESSION_KEY = {
    USER_KEY: 'user',
    RESTAURANT_KEY: 'restaurant',
    CART_KEY: 'cart'
}

export function setSessionItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionItem(key) {
    const value = sessionStorage.getItem(key);
    return value !== null ? JSON.parse(value) : value;
}

export function removeSessionItem(key) {
    sessionStorage.removeItem(key);
}

export function clearSession() {
    removeSessionItem(SESSION_KEY.USER_KEY);
    removeSessionItem(SESSION_KEY.RESTAURANT_KEY);
    removeSessionItem(SESSION_KEY.CART_KEY);
}