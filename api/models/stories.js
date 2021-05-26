const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema({
    name: { type: String, required: true },
    story: { type: Object, required: true }
});

module.exports = mongoose.model('Story', storiesSchema);
