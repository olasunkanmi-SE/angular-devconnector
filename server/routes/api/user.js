
const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user');

//Get all Users
router.get('/', UserController.getUsers);
//Register a User
router.post('/register', UserController.createUser);


module.exports = router;