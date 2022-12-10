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

/* GET all restaurants with the list of tags */
router.post('/tags', restaurant_controller.restaurant_list_by_tags);

/* GET all currently open restaurants */
router.get('/open', restaurant_controller.open_restaurant_list);

/* Add a new restaurant */
router.post('/', restaurant_controller.restaurant_create);

/* Update a restaurant */
router.post('/id/:id', restaurant_controller.restaurant_edit);

module.exports = router;
