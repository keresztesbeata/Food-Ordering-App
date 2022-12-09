export const BASE_URL = "http://localhost:5000";

export function customError(message, details) {
    let error = new Error(message);
    error.details = details;
    throw error;
}