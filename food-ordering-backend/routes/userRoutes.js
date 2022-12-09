const express = require('express');
const router = express.Router();

const users_controller = require("../controllers/userController")

/* GET users listing. */
router.get('/', users_controller.user_list);

/* GET user by username */
router.get('/:username', users_controller.user_detail);

/* Login user */
router.post('/perform_login', users_controller.user_login);

/* Add a new user */
router.post('/', users_controller.user_register);

/* Edit user info */
router.post('/:id/edit', users_controller.user_edit);

module.exports = router;
