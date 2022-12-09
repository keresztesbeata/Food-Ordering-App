const {throw_custom_error} = require("../error/errorHandler");
const Order = require("../models/order").Order;
const user_service = require("./userService");
const restaurant_service = require("./restaurantService");
const mongoose = require("mongoose");

exports.find_by_restaurant = (restaurant_name) => {
    return restaurant_service.find_by_name(restaurant_name)
        .then(restaurant => {
            if (restaurant === null) {
                throw_custom_error(404, `No restaurant exists with the name ${restaurant_name}!`)
            }
            return Order.find({restaurant: restaurant._id})
                // list the most recent orders first
                .sort([["order_date", -1]])
                .then(orders => {
                    console.log(`Successfully retrieved ${orders.length} orders belonging to the restaurant ${restaurant_name}`);
                    return orders;
                });
        });
};

exports.find_by_customer = (customer_name) => {
    return user_service.find_by_username(customer_name)
        .then(customer => {
            if (customer === null) {
                throw_custom_error(404, `No customer exists with the username ${customer_name}!`)
            }
            return Order.find({customer: customer._id})
                // list the most recent orders first
                .sort([["order_date", -1]])
                .then(orders => {
                    console.log(`Successfully retrieved ${orders.length} orders belonging to the customer ${customer.username}`);
                    return orders;
                });
        });
};

exports.insert_order = (order_data) => {
    return restaurant_service.find_by_id(order_data.restaurant)
        .then(foundRestaurant => {
            return user_service.find_by_id(order_data.customer)
                .then(user => {
                    if (user === null) {
                        throw_custom_error(404, `No customer with name ${order_data.customer} was found!`);
                    }
                    // extract the address of delivery from the user data when needed
                    if (order_data.delivery_address === undefined) {
                        order_data.delivery_address = user.address;
                    }
                    // set the date of the order to the current date
                    order_data.order_date = new mongoose.Types.Date();
                    console.log(order_data);
                    // add the delivery fee
                    order_data.total_price += foundRestaurant.delivery_fee;
                    // create the order model
                    const order = new Order(order_data);
                    // save the order
                    return order.save()
                        .then(savedOrder => {
                            console.log(`Order with id ${savedOrder._id} for customer ${user.credentials.username} and restaurant ${foundRestaurant.name} has been successfully added!`)
                            return savedOrder;
                        })
                        .catch((err) => {
                            console.log(err)
                            throw_custom_error(400, "Failed to insert new order! Invalid input data");
                        });
                });
        });
}
