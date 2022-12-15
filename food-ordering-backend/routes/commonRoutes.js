const express = require('express');
const router = express.Router();
const common_controller = require("../controllers/commonController");

/* GET all categories */
router.get('/', common_controller.categories_list);

module.exports = router;