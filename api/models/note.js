const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    location: {
        story: { type: mongoose.Types.ObjectId, required: true, ref: 'Story' },
        stitch: { type: String, required: true }
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    score: { type: Number, required: true },
    image: { type: String, required: false } // Could take a URL to an image, theoretically.
},
{ timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
