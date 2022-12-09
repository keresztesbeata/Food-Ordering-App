const express = require('express');
const router = express.Router();
const restaurant_controller = require("../controllers/restaurantController");

/* GET restaurants listing. */
router.get('/', restaurant_controller.restaurant_list);

/* GET restaurant details by id */
router.get('/id/:id', restaurant_controller.restaurant_detail_by_id);

/* GET restaurant details by owner */
router.get('/owner/:owner', restaurant_controller.restaurant_detail_by_owner);

/* GET restaurant details by name */
router.get('/name/:name', restaurant_controller.restaurant_detail_by_name);

/* GET restaurant details by name */
router.get('/matches/:namematch', restaurant_controller.restaurant_list_by_name_match);

/* GET all restaurants with the list of tags */
router.get('/tag/:tag', restaurant_controller.restaurant_list_by_tag);

/* GET all currently open restaurants */
router.get('/open', restaurant_controller.open_restaurant_list);

/* Add a new restaurant */
router.post('/', restaurant_controller.restaurant_create);

module.exports = router;
