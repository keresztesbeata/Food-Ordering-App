const e = require("express");

function handle_error(error, response) {
    console.error(error);
    return response
        .status(error.status)
        .json(error.message);
}

function throw_custom_error(status, message) {
    let error = new Error(message);
    error.status = status;
    throw error;
}

module.exports = {
    handle_error, throw_custom_error
}