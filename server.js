const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const user = require('./server/routes/api/user');
const auth = require('./server/routes/api/auth');
const profile = require('./server/routes/api/profile')
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();




//Connect mongoose to database
mongoose.connect('mongodb://localhost/social')
    .then(() => console.log('connected to database successfully'))
    .catch(err => console.err());

mongoose.Promise = global.Promise;

//Api files for interacting with mongoDB


//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Passport middleware
app.use(passport.initialize());

//passport Config
require('./config/passport')(passport);

//API location
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/profiles', profile);

//Send all other requests to the angular App

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/blog/index.html'));
// });

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));