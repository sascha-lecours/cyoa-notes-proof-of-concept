const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema({
    name: { type: String, required: true },
    story: { type: Object, required: true },
    image: { type: String, required: false }
});

module.exports = mongoose.model('Story', storiesSchema);
