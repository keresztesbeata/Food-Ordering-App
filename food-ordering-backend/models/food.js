const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "You must specify the id of the restaurant for the food!"]
    },
    name: {
        type: String,
        required: [true, "You must specify the name of the food!"]
    },
    category: {
        type: String,
        enum: [
            'Appetizers',
            'Salad',
            'Soup',
            'Main',
            'Pizza',
            'Pasta',
            'Dessert'
        ],
        required: [true, "You must specify the category of the food!"]
    },
    price: {
        type: Number,
        min: [0.001, "Price must be a positive real number"],
        required: [true, "You must specify the price of the food!"]
    },
    portion_size: {
        type: Number,
        min: [0.001, "Portion size must be a positive real number"],
        required: [true, "You must specify the portion_size of the food!"]
    },
});

// Compile models from schema
const Food = mongoose.model("Food", FoodSchema, "foods");

module.exports = {
    Food
}