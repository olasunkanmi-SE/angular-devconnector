
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');
const auth = require('../../middlewares/auth')



router.get('/', userController.users);

router.post('/register', auth, userController.register);


module.exports = router;