const service = require("../services/commonService");
const {handle_error} = require("../error/errorHandler");

exports.categories_list = (req, res) => {
    service.find_categories()
        .then(categories => {
            res
                .status(200)
                .json(categories);
        })
        .catch((err) => handle_error(err, res));
}
