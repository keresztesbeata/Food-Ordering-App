const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    credentials: {
        type: Object, properties: {
            username: {type: String, minLength: 3, required: [true, "You must specify the username!"]},
            password: {type: String, minLength: 3, required: [true, "You must specify the password!"]}
        }, required: [true, "You must specify the credentials!"]
    },
    role: {type: String, enum: ["ADMIN", "CUSTOMER"], required: [true, "You must select a user role!"]},
    firstname: {type: String, minLength: 3},
    lastname: {type: String, minLength: 3},
    email: {type: String, regexp: "^.+[@].+$", minLength: 3},
    address: {
        city: String, street: String, nr: Number
    }
});

// Compile models from schema
const User = mongoose.model("User", UserSchema, "users");

module.exports = {
    User
}