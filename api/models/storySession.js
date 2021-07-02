const mongoose = require('mongoose');

const storySessionSchema = mongoose.Schema({
    userName: { type: String, required: true }, // TODO: this can be phased out to only use the objectID in "creator"
    storyName: { type: Object, required: true },
    sessionLastActiveStitch: { type: String },
    sessionFlaglist: { type: Array, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
},
{ timestamps: true }
);

module.exports = mongoose.model('StorySession', storySessionSchema);
