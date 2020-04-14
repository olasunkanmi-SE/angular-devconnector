const winston = require('winston');
const error = require('./server/middleware/error');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const user = require('./server/routes/api/user');
const auth = require('./server/routes/api/auth');
const profile = require('./server/routes/api/profile');
const post = require('./server/routes/api/post');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const fs = require('fs');




const myFormat = winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

//Error and exception Logging with Winston to a log file
let logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), myFormat),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: error }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({ colorize: true, prettyPrint: true })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),

    ],
    exitOnError: false

});

process.on('unhandledRejection', (reason, promise) => {
    logger.debug(reason);
})

process.on('uncaughtException', (err) => {
    logger.debug(err);
})



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
app.use('/api/posts', post);

//Log Error
app.use(error)

//Send all other requests to the angular App

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/blog/index.html'));
// });

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = logger;