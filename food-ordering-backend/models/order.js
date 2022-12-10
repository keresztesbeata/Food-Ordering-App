const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "You must specify the restaurant!"]
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "You must specify the customer!"]
    },
    delivery_address: {
        type: Object,
        properties: {
            city: String, street: String, nr: Number
        },
        required: [true, "You must specify the address of delivery!"]
    },
    order_date: {
        type: Date,
        default: Date.now(),
        required: [true, "You must specify the date on which the order was created!"]
    },
    total_price: {
        type: Number,
        min: [0, "Price must be a positive number"],
        required: [true, "You must specify the total price of the order!"]
    },
    items: {
        type: Array,
        items: {
            properties: {
                id: {
                    type: String
                },
                quantity: {
                    type: Number,
                    min: [1, "You must add at least 1 piece of this item!"]
                }
            }
        },
        minLength: [1, "You must select at least 1 item to place the order!"]
    }
});

// Compile models from schema
const Order = mongoose.model("Order", OrderSchema, "orders");

module.exports = {
    Order
}