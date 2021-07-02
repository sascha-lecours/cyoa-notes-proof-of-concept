const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    notes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Note' }], 
    storySessions: [{ type: mongoose.Types.ObjectId, required: true, ref: 'StorySession' }], 
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
