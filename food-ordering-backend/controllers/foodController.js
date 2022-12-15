const service = require("../services/foodService");
const {handle_error} = require("../error/errorHandler");

exports.food_list = (req, res) => {
    service.find_by_restaurant(req.params.restaurant)
        .then(foods => {
            res
                .status(200)
                .json(foods);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_list_by_category = (req, res) => {
    service.find_by_restaurant_and_category(req.params.restaurant, req.params.category)
        .then(foods => {
            res
                .status(200)
                .json(foods);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_list_by_ingredients = (req, res) => {
    service.find_by_restaurant_and_ingredients(req.params.restaurant, req.body.ingredients)
        .then(foods => {
            res
                .status(200)
                .json(foods);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_detail_by_name = (req, res) => {
    service.find_by_restaurant_and_name(req.params.restaurant, req.params.name)
        .then(food => {
            res
                .status(200)
                .json(food);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_create = (req, res) => {
    service.insert_food(req.params.restaurant, req.body)
        .then(food => {
            res
                .status(201)
                .json(food);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_bulk_create = (req, res) => {
    service.bulk_insert_food(req.params.restaurant, req.body)
        .then(food => {
            res
                .status(201)
                .json(food);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_edit = (req, res) => {
    service.edit_food(req.params.id, req.body)
        .then(food => {
            res
                .status(200)
                .json(food);
        })
        .catch((err) => handle_error(err, res));
}

exports.food_delete = (req, res) => {
    service.delete_food(req.params.id)
        .then(food => {
            res
                .status(200)
                .json(food);
        })
        .catch((err) => handle_error(err, res));
}

