const { validationResult } = require('express-validator');
const Note = require('../models/note');
const NoteService = require('../services/noteService');
const HttpError = require('../models/httpError');
const mongoose = require('mongoose');
const Users = require('../models/user');

const createNote = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid note passed, check data.', 422)
        );
    }
    const { creator, location, content } = req.body;

    // TODO: Take image as input in form?
    const placeHolderImage = "https://homepages.cae.wisc.edu/~ece533/images/tulips.png"; 

    const createdNote = new Note({
        creator,
        location,
        content,
        score: 0,
        image: placeHolderImage
    });

    let user;

    try {
        console.log(creator);
        user = await Users.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'Creating note failed (error when finding ID)',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'Could not find user for provided ID', 
            404
        );
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdNote.save({ session: sess });
        user.notes.push(createdNote);
        await user.save({ session: sess });
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError(
            'Creating note has failed',
            500
        );
        return next(error);
    }
    console.log(`Created a note on storyId: "${location.story}"`);
    res.status(201).json({ note: createdNote });
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
        const error =  new HttpError(
            'Could not find a note with the specified ID.', 404
        );
        return next(error);
    }
    res.json({ note: note.toObject({ getters: true }) }); // "Getters" being true adds "id" property, not just the underscore-prefixed ID in DB.
}

const getNotesByLocation = async (req, res, next) => {
    const { location } = req.body;
    const fetchedNotes = await NoteService.getNotesByLocation(location);
    res.status(200).json( fetchedNotes );
}

const getNotes = async (req, res, next) => {
    let notes;
    try {
        notes = await Note.find({}); // Empty object for projection.
    } catch (err) {
        const error = new HttpError(
            'Fetching notes failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ notes: notes.map(note => note.toObject({getters: true })) });

}

const getNotesByUserId = async (req, res, next) => {

    const userId = req.params.uid;
    let userWithNotes;

    try {
        console.log(userId);
        userWithNotes = await Users.findById(userId).populate('notes');
    } catch (err) {
        const error = new HttpError(
            'Fetching notes by user ID failed, please try again later',
            500
        );
        return next(error);
    }

    if(!userWithNotes || userWithNotes.notes.length === 0) {
        return next(
            new HttpError('Could not find notes for the provided user ID.', 404)
        );
    };

    res.json({ notes: userWithNotes.notes.map(note => note.toObject({ getters: true })) });
}

const updateNote = async (req, res, next) => {
    // TODO
}

const deleteNote = async (req, res, next) => {
    const noteId = req.params.nid;

    let note;
    try {
        note = await Note.findById(noteId).populate('creator'); // Using populate() to refer to a doc in another collection using the relations in the models.
    } catch (err) {
        const error = new HttpError(
            'Something went wrong while attempting to a delete a note. (1)',
            500
        );
        return next(error);
    }

    if (!note) {
        const error = new HttpError(
            'No note found for this ID.',
            404
        );
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await note.remove({ session: sess });
        note.creator.notes.pull(note); // This works because creator was populated() earlier so creator's fields are available
        await note.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong while attempting to a delete a note. (2)',
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
exports.getNotesByUserId = getNotesByUserId;
exports.getNotes = getNotes;
