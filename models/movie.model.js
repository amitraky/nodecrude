const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    year: {
        type: String
    },
    photo: {
        type: String
    },
    description: {
        type: String
    }
});
mongoose.model('Movie', movieSchema);