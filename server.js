const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const myapp = require('./server/routes/app');
const mongoose = require('mongoose');
const app = express();


//Connect mongoose to database
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('connected to database successfully'))
    .catch(err => console.err());

//Api files for interacting with mongoDB


//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//API location
app.use('/api/apps', myapp);

//Send all other requests to the angular App

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/blog/index.html'));
// });

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));