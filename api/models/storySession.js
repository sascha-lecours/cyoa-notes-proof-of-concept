const mongoose = require('mongoose');

const storySessionSchema = mongoose.Schema({
    userName: { type: String, required: true }, // TODO: this can be phased out to only use the objectID in "creator"
    storyName: { type: Object, required: true }, // TODO: Phase this out and use the storyID in 'Story'
    sessionLastActiveStitch: { type: String },
    sessionFlaglist: { type: Array, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    story: { type: mongoose.Types.ObjectId, required: true, ref: 'Story' }, 
},
{ timestamps: true }
);

module.exports = mongoose.model('StorySession', storySessionSchema);
