const {throw_custom_error} = require("../error/errorHandler");
const Restaurant = require("../models/restaurant").Restaurant;
const user_service = require("./userService");

exports.find_all = () => {
    return Restaurant.find({})
        .then(restaurants => {
            console.log(`Successfully retrieved ${restaurants.length} restaurants`);
            return restaurants;
        });
};

exports.find_by_name = (name) => {
    return Restaurant.findOne({name: name})
        .then(restaurant => {
            if (restaurant === null) {
                throw_custom_error(404, `No restaurant exists with the name ${name}!`)
            }
            console.log(`Successfully retrieved restaurant by name ${restaurant.name}`);
            return restaurant;
        });
};

exports.find_by_owner = (owner_name) => {
    // retrieve the id of the owner (only the username is given)
    return user_service.find_by_username(owner_name)
        .then(user => {
            return Restaurant.findOne({owner: user._id})
                .then(restaurant => {
                    console.log(`Successfully retrieved restaurant by name ${restaurant.name}`);
                    return restaurant;
                })
                .catch((err) => {
                    console.log(err);
                    throw_custom_error(404, `No restaurant exists belonging to the user ${owner_name}!`)
                });
        });
};

exports.find_by_schedule = (current_hour) => {
    return Restaurant.find({"schedule.opening_hour": {$lte: current_hour}, "schedule.closingHour": {$gt: current_hour}})
        .then(restaurants => {
            console.log(`Successfully retrieved ${restaurants.length} restaurants which are currently open`);
            return restaurants;
        });
};

exports.find_by_tags = (tags) => {
    return Restaurant.find({tags: {$in: tags}})
        .then(restaurants => {
            console.log(`Successfully retrieved ${restaurants.length} restaurants`);
            return restaurants;
        });
};

exports.insert_restaurant = (restaurant_data) => {
    // retrieve the id of the owner (only the username is given)
    return user_service.find_by_username(restaurant_data.owner)
        .then(user => {
            if (user === null) {
                throw_custom_error(404, `Owner ${restaurant_data.owner} not found!`);
            } else {
                // add the id of the owner
                restaurant_data.owner = user._id;
                const restaurant = new Restaurant(restaurant_data);
                // check if the name is unique and if the owner doesn't have other restaurants
                return Restaurant.findOne({name: restaurant_data.name, owner: user._id})
                    .then(existingRestaurant => {
                        if (existingRestaurant !== null) {
                            throw_custom_error(400, `Failed to insert new restaurant: duplicate name or owner! Either the name ${existingRestaurant.name} is already being used or the owner ${restaurant_data.owner} already has another restaurant.`);
                        } else {
                            // save the restaurant
                            return restaurant.save()
                                .then(savedRestaurant => {
                                    console.log(`Restaurant with name ${savedRestaurant.name} and id ${savedRestaurant._id} has been successfully added!`)
                                    return savedRestaurant;
                                })
                                .catch((err) => {
                                    console.log(err)
                                    throw_custom_error(400, "Failed to insert new restaurant! Invalid input data");
                                });
                        }
                    })
            }
        });
}