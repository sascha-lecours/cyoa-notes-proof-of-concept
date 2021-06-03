const { validationResult } = require('express-validator');
const Note = require('../models/note');
const HttpError = require('../models/httpError');

/*
const noteSchema = new Schema({
    creator: { type: Object, required: true }, //TODO: This can be more prescriptive and narrow as the details of users are made concrete.
    location: {
        story: { type: String, required: true },
        stitch: { type: String, required: true }
    },
    content: { type: String, required: true },
    score: { type: Number, required: true },
    image: { type: String, required: false } // Could take a URL to an image, theoretically.
});
*/

const createNote = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid note passed, check data.', 422)
        );
    }
    const { user, location, content, score, image } = req.body;

    const createdNote = new Note({
        creator: user,
        location,
        content,
        score,
        image
    });

    try {
        await createdNote.save();
    } catch (err) {
        const error = new HttpError(
            'Creating note has failed',
            500
        );
        return next(error);
    }
    console.log(`Created a note on story "${location.story}"`);
    res.status(201).json({ note: createdNote });
}

const getNotesByLocation = async (req, res, next) => {
    const storyName = req.body.location.story;
    const stitchName = req.body.location.stitch;
    let fetchedNotes = [];

    try{
        fetchedNotes = await Note.find({ 
            location:{
                story: storyName,
                stitch: stitchName
        }
    }).exec();
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find notes at location', 500
        );
        return next(error);
    }


    res.json(fetchedNotes);
}

const getNoteById = async (req, res, next) => {
    const noteId = req.body.id;
    let note; 

    try{
        note = await Note.findById(noteId); // Not a "real" promise, but Mongoose still allows async/await
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find note', 500
        );
        return next(error);
    }
    
    if(!note) {
        const error =  new HttpError('Could not find a note with the specified ID.', 404);
        return next(error);
    }
    res.json({ note: note.toObject({ getters: true }) }); // "Getters" being true adds "id" property, not just the underscore-prefixed ID in DB.
}




exports.getNoteById = getNoteById;
exports.getNotesByLocation = getNotesByLocation;
exports.createNote = createNote;
