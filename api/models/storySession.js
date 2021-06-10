const mongoose = require('mongoose');

const storySessionSchema = mongoose.Schema({
    userName: { type: String, required: true },
    StoryName: { type: Object, required: true },
    sessionLastActiveStitch: { type: String },
    sessionFlaglist: { type: Object }
});

module.exports = mongoose.model('StorySession', storySessionSchema);
