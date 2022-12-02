const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {type: String, minLength: 3, required: [true, "You must specify the name of the restaurant!"]},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "You must specify the id of the owner of the restaurant!"]
    },
    address: {
        type: Object,
        properties: {
            city: String, street: String, nr: Number
        },
        required: [true, "You must specify the address of the restaurant!"]
    },
    delivery_fee: {
        type: Number, min: [0, "Delivery fee must be a non-negative real number"],
        required: [true, "You must specify the delivery fee of the restaurant!"]
    },
    schedule: {
        type: Object,
        properties: {
            opening_hour: {type: Number, min: 0, max: 23},
            closing_hour: {type: Number, min: 0, max: 23}
        },
        required: [true, "You must specify the schedule of the restaurant!"]
    },
    tags: {
        type: Array,
        items: {
            type: String
        }
    },
    rating: {type: Number, min: [0, "Min rating is 0 stars!"], max: [5, "Max rating is 5 stars!"]}
});

// Compile models from schema
const Restaurant = mongoose.model("Restaurant", RestaurantSchema, "restaurants");

module.exports = {
    Restaurant
}