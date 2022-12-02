const service = require("../services/orderService");
const {handle_error} = require("../error/errorHandler");

exports.order_list_by_restaurant = (req, res) => {
    service.find_by_restaurant(req.params.restaurant)
        .then(orders => {
            res
                .status(200)
                .json(orders);
        })
        .catch((err) => handle_error(err, res));
}

exports.order_list_by_customer = (req, res) => {
    service.find_by_customer(req.params.customer)
        .then(orders => {
            res
                .status(200)
                .json(orders);
        })
        .catch((err) => handle_error(err, res));
}

exports.order_create = (req, res) => {
    service.insert_order(req.body)
        .then(order => {
            res
                .status(201)
                .json(order);
        })
        .catch((err) => handle_error(err, res));
}