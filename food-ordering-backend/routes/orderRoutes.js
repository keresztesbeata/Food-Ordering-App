const express = require('express');
const router = express.Router();
const order_controller = require("../controllers/orderController");

/* GET all restaurants with the list of tags */
router.get('/restaurant/:restaurant', order_controller.order_list_by_restaurant);

/* GET all orders of customer */
router.get('/customer/:customer', order_controller.order_list_by_customer);

/* Add a new order */
router.post('/', order_controller.order_create);

module.exports = router;
