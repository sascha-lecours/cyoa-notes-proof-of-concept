const mongoose = require('mongoose');

const storySessionSchema = mongoose.Schema({
    sessionLastActiveStitch: { type: String, default: null },
    sessionFlaglist: { type: Array, required: true, default: [] },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    story: { type: mongoose.Types.ObjectId, required: true, ref: 'Story' }, 
},
{ timestamps: true }
);

module.exports = mongoose.model('StorySession', storySessionSchema);
