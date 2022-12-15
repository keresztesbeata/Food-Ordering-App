const {Common} = require("../models/common");

exports.find_categories = () => {
    return Common.findOne()
        .then(data => {
            console.log(`Successfully retrieved ${data.categories.length} categories`);
            return data.categories;
        });
}