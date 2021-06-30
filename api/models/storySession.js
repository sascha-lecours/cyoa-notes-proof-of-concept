const mongoose = require('mongoose');

const storySessionSchema = mongoose.Schema({
    // userID: { type: String }, // move to ID only
    userName: { type: String, required: true },
    storyName: { type: Object, required: true },
    sessionLastActiveStitch: { type: String },
    sessionFlaglist: { type: Array, required: true }
    
},
{ timestamps: true }
);

module.exports = mongoose.model('StorySession', storySessionSchema);
