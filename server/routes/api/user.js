
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');
const auth = require('../../middlewares/auth')


//Get all users
router.get('/', userController.users);


//Register a user
router.post('/register', auth, userController.register);


module.exports = router;