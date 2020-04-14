const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../../controllers/auth')

// import { enviroment } from '../../../src/environments/environment';


//Sign in a User

router.post('/', authController.auth);

//Get Current User

router.get('/current', passport.authenticate('jwt', { session: false }), authController.getCurrentUser)



module.exports = router;