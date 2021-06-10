const { validationResult } = require('express-validator');
const Note = require('../models/note');
const HttpError = require('../models/httpError');
const mongoose = require('mongoose');

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
    console.log(`get notes request body : ${JSON.stringify(req.body)}`);
    const storyName = req.body.location.story;
    const stitchName = req.body.location.stitch;
    
    let fetchedNotes = [];
    try{
        fetchedNotes = await Note.find({ 
            location:{
                story: storyName,
                stitch: stitchName
        }
    })
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find notes at location', 500
        );
        return next(error);
    }
    res.status(200).json({ fetchedNotes: fetchedNotes.map(note => note.toObject({ getters: true })) });
}

const getNoteById = async (req, res, next) => {
    const noteId = req.params.nid;
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

const updateNote = async (req, res, next) => {
    // TODO
}

const deleteNote = async (req, res, next) => {
    const noteId = req.params.nid;

    let note;
    try {
        note = await Note.findById(noteId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong while attempting to a delete a note.',
            500
        );
        return next(error);
    }

    try {
        await note.remove();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong while attempting to a delete a note.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted note.' });
}




exports.getNoteById = getNoteById;
exports.getNotesByLocation = getNotesByLocation;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
