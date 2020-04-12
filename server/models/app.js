const mongoose = require('mongoose');

const { Schema } = mongoose;


const appSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const App = mongoose.model('app', appSchema);


exports.App = App;