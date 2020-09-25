const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    name: {
        type: String
    },
    year: {
        type: String
    },
    photo: {
        type: String
    },
	photo2: {
        type: String
    },
    description: {
        type: String
    }
});
mongoose.model('Movie', movieSchema);