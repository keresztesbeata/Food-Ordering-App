const service = require("../services/restaurantService");
const {handle_error} = require("../error/errorHandler");

exports.restaurant_list = (req, res) => {
    service.find_all()
        .then(restaurants => {
            res
                .status(200)
                .json(restaurants);
        })
        .catch((err) => handle_error(err, res));
}

exports.restaurant_list_by_tags = (req, res) => {
    service.find_by_tags(req.body.tags)
        .then(restaurants => {
            res
                .status(200)
                .json(restaurants);
        })
        .catch((err) => handle_error(err, res));
}

exports.open_restaurant_list = (req, res) => {
    const current_hour = new Date().getHours();
    service.find_by_schedule(current_hour)
        .then(restaurants => {
            res
                .status(200)
                .json(restaurants);
        })
        .catch((err) => handle_error(err, res));
}

exports.restaurant_detail_by_name = (req, res) => {
    service.find_by_name(req.params.name)
        .then(restaurant => {
            res
                .status(200)
                .json(restaurant);
        })
        .catch((err) => handle_error(err, res));
}

exports.restaurant_detail_by_owner = (req, res) => {
    service.find_by_owner(req.params.owner)
        .then(restaurant => {
            res
                .status(200)
                .json(restaurant);
        })
        .catch((err) => handle_error(err, res));
}

exports.restaurant_create = (req, res) => {
    service.insert_restaurant(req.body)
        .then(restaurant => {
            res
                .status(201)
                .json(restaurant);
        })
        .catch((err) => handle_error(err, res));
}