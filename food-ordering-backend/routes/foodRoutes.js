const express = require('express');
const router = express.Router();
const food_controller = require("../controllers/foodController");

/* GET foods listing. */
router.get('/:restaurant', food_controller.food_list);

/* GET food details by name and restaurant */
router.get('/:restaurant/name/:name', food_controller.food_detail_by_name);

/* GET foods by category */
router.get('/:restaurant/category/:category', food_controller.food_list_by_category);

/* GET foods by ingredients */
router.get('/:restaurant/ingredients', food_controller.food_list_by_ingredients);

/* Add a new food */
router.post('/:restaurant', food_controller.food_bulk_create);

module.exports = router;
