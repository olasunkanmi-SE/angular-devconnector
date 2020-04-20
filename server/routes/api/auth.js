
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../../controllers/auth');
const auth = require('../../middleware/auth');

// import { enviroment } from '../../../src/environments/environment';


//Sign in a User

router.post('/', authController.auth);

//Get Current User

router.get('/current', auth, authController.getCurrentUser)



module.exports = router;