const {throw_custom_error} = require("../error/errorHandler");
const Food = require("../models/food").Food;
const restaurant_service = require("./restaurantService");

function find_restaurant(restaurant_name) {
    return restaurant_service.find_by_name(restaurant_name)
        .then(restaurant => {
            console.log(restaurant)
            if (restaurant === null) {
                throw_custom_error(404, `No restaurant with name ${restaurant_name} was found!`);
            }
            return restaurant;
        });
}

exports.find_by_restaurant = (restaurant_name) => {
    return find_restaurant(restaurant_name)
        .then(restaurant => {
            return Food.find({restaurant: restaurant._id})
                .then(foods => {
                    console.log(`Successfully retrieved ${foods.length} foods`);
                    return foods;
                })
        });
};

exports.find_by_name_and_restaurant = (name, restaurant_name) => {
    return find_restaurant(restaurant_name)
        .then(restaurant => {
            return Food.findOne({name: name, restaurant: restaurant._id})
                .then(food => {
                    console.log(`Successfully retrieved food by name ${food.name} and restaurant ${restaurant_name}`);
                    return food;
                })
        });
};

exports.find_by_category_and_restaurant = (category, restaurant_name) => {
    return find_restaurant(restaurant_name)
        .then(restaurant => {
            return Food.find({category: category, restaurant: restaurant})
                .then(foods => {
                    console.log(`Successfully retrieved ${foods.length} foods by category ${category} and for restaurant ${restaurant_name}`);
                    return foods;
                })
        });
};

exports.find_by_ingredients_and_restaurant = (ingredients, restaurant_name) => {
    return find_restaurant(restaurant_name)
        .then(restaurant => {
            return Food.find({ingredients: {$in: ingredients}, restaurant: restaurant._id})
                .then(foods => {
                    console.log(`Successfully retrieved ${foods.length} foods by ingredients ${ingredients} for restaurant ${restaurant_name}`);
                    return foods;
                })
        });
};

exports.insert_food = (restaurant_name, food_data) => {
    // retrieve the id of the owner (only the username is given)
    return find_restaurant(restaurant_name)
        .then(existingRestaurant => {
            // add the id of the restaurant
            food_data.restaurant = existingRestaurant._id;
            const food = new Food(food_data);
            // check if the name is unique and if no other food exists with the same name in the same restaurant
            return Food.findOne({name: food_data.name, restaurant: existingRestaurant.name})
                .then(existingFood => {
                    if (existingFood !== null) {
                        throw_custom_error(400, `Failed to insert new food: duplicate name ${existingFood}.name!`);
                    } else {
                        // save the food
                        return food.save()
                            .then(savedFood => {
                                console.log(`Food with name ${savedFood.name} and id ${savedFood._id} has been successfully added!`)
                                return savedFood;
                            })
                            .catch((err) => {
                                console.log(err)
                                throw_custom_error(400, "Failed to insert new food! Invalid input data");
                            });
                    }
                })
        });
}

exports.bulk_insert_food = (restaurant_name, food_list) => {
    // retrieve the id of the owner (only the username is given)
    return find_restaurant(restaurant_name)
        .then(existingRestaurant => {
            // add the id of the restaurant
            const foods = food_list.map(food_data => {
                food_data.restaurant = existingRestaurant._id;
                return new Food(food_data);
            });
            // save the foods
            return Food.insertMany(foods)
                .then(savedFoods => {
                    console.log(`Successfully saved ${savedFoods.length} foods!`)
                    return savedFoods;
                })
                .catch((err) => {
                    console.log(err)
                    throw_custom_error(400, "Failed to insert new food! Invalid input data.");
                });
        });
}