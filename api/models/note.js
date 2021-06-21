const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    creator: { type: Object, required: true }, //TODO: This can be more prescriptive and narrow as the details of users are made concrete.
    location: {
        story: { type: String, required: true },
        stitch: { type: String, required: true }
    },
    content: { type: String, required: true },
    score: { type: Number, required: true },
    image: { type: String, required: false } // Could take a URL to an image, theoretically.
},
{ timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
