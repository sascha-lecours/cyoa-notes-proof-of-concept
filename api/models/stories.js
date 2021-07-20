const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema({
    name: { type: String, required: true },
    story: { type: Object, required: true },
    image: { type: String, required: false, default: 'https://picsum.photos/seed/picsum/200/300' }
});

module.exports = mongoose.model('Story', storiesSchema);
