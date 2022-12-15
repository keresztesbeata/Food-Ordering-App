const {throw_custom_error} = require("../error/errorHandler");
const Food = require("../models/food").Food;
const restaurant_service = require("./restaurantService");
const mongoose = require("mongoose");

exports.find_by_id = (id) => {
    return Food.findOne({"_id": new mongoose.Types.ObjectId(id)})
        .then(food => {
            if (food === null) {
                throw_custom_error(404, `No food exists with the id ${id}!`)
            }
            console.log(`Successfully retrieved food by id ${id}`);
            return food;
        });
};

exports.find_by_restaurant = (restaurant_name) => {
    return restaurant_service.find_by_name(restaurant_name)
        .then(restaurant => {
            return Food.find({restaurant: restaurant._id})
                .then(foods => {
                    console.log(`Successfully retrieved ${foods.length} foods`);
                    return foods;
                })
        });
};

exports.find_by_restaurant_and_name = (restaurant_name, name) => {
    return restaurant_service.find_by_name(restaurant_name)
        .then(restaurant => {
            return Food.findOne({name: name, restaurant: restaurant._id})
                .then(food => {
                    console.log(`Successfully retrieved food by name ${food.name} and restaurant ${restaurant_name}`);
                    return food;
                })
        });
};

exports.find_by_restaurant_and_category = (restaurant_name, category) => {
    return restaurant_service.find_by_name(restaurant_name)
        .then(restaurant => {
            return Food.find({category: category, restaurant: restaurant._id})
                .then(foods => {
                    console.log(`Successfully retrieved ${foods.length} foods by category ${category} and for restaurant ${restaurant_name}`);
                    return foods;
                })
        });
};

exports.find_by_restaurant_and_ingredients = (restaurant_name, ingredients) => {
    return restaurant_service.find_by_name(restaurant_name)
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
    return restaurant_service.find_by_name(restaurant_name)
        .then(existingRestaurant => {
            // add the id of the restaurant
            food_data.restaurant = existingRestaurant._id;
            const food = new Food(food_data);
            // check if the name is unique and if no other food exists with the same name in the same restaurant
            return Food.findOne({name: food_data.name, restaurant: new mongoose.Types.ObjectId(existingRestaurant._id)})
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
                                throw_custom_error(400, Object.values(err.errors));
                            });
                    }
                })
        });
}

exports.bulk_insert_food = (restaurant_name, food_list) => {
    // retrieve the id of the owner (only the username is given)
    return restaurant_service.find_by_name(restaurant_name)
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
                    throw_custom_error(400, Object.values(err.errors));
                });
        });
}

exports.edit_food = (id, food_data) => {
    return this.find_by_id(id)
        .then(food => {
            food.name = food_data.name;
            food.category = food_data.category;
            food.ingredients = food_data.ingredients;
            food.price = food_data.price;
            food.portion_size = food_data.portion_size;
            return food.save()
                .then(savedFood => {
                    console.log(`Food with name ${savedFood.name} and id ${savedFood._id} has been successfully updated!`)
                    return savedFood;
                })
                .catch((err) => {
                    throw_custom_error(400, Object.values(err.errors));
                });
        });
}

exports.delete_food = (id) => {
    console.log('deleting:', id)
    return Food.findByIdAndDelete(new mongoose.Types.ObjectId(id))
        .then(deletedFood => {
            console.log(`Food with name ${deletedFood.name} and id ${deletedFood._id} has been successfully deleted!`)
            return deletedFood;
        })
        .catch((err) => {
            throw_custom_error(400, `Couldn't delete food with id ${id}!`);
        });
}