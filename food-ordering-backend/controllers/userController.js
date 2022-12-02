const service = require("../services/userService");
const {handle_error} = require("../error/errorHandler");

exports.user_list = (req, res) => {
    service.find_all()
        .then(users => {
            res
                .status(200)
                .json(users);
        })
        .catch((err) => handle_error(err, res));
}

exports.user_detail = (req, res) => {
    service.find_by_username(req.params.username)
        .then(user => {
            res
                .status(200)
                .json(user);
        })
        .catch((err) => handle_error(err, res));
}

exports.user_login = (req, res) => {
    service.find_by_credentials(req.body.username, req.body.password)
        .then(user => {
            res
                .status(200)
                .json(user);
        })
        .catch((err) => handle_error(err, res));
}

exports.user_register = (req, res) => {
    service.insert_user(req.body)
        .then(user => {
            res
                .status(201)
                .json(user);
        })
        .catch((err) => handle_error(err, res));
}