const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommonSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categories: {
        type: Array,
        items: {
            type: String
        }
    }
});

// Compile models from schema
const Common = mongoose.model("Common", CommonSchema, "commons");

module.exports = {
    Common
}