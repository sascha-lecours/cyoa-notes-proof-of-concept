const libinkle = require('libinkle');

const { validationResult } = require('express-validator');

const Story = require('../models/stories');
const StorySession = require('../models/storySession');
const NoteService = require('../services/noteService');
const StoryService = require('../services/storyService');
const StorySessionService = require('../services/storySessionService');
const Users = require('../models/user');
const mongoose = require('mongoose');

const HttpError = require('../models/httpError');


const createStory = async (req, res, next) => {
    const { name, story } = req.body

    const createdStory = new Story({
        name,
        story
    });
    const result = await createdStory.save();
    console.log("Created Story with ID: " + createdStory.id);
    res.json(result); // The entire story that was saved - fairly big.
};

const getStories = async (req, res, next) => { // Array of all stories. Extremely big.
    const stories = await Story.find().exec(); // Mongoose find() is array by default // exec() makes it a 'real' promise
    
    res.json({ stories: stories.map(story => story.toObject({getters: true })) });
};


// Takes in a usersession as an argument and returns a frontendobject 
// TODO: this may be redundant in combination with the story moving method which returns a frontend object.
const getStoryFrontEndObject = async (req, res, next) => {
    /*{
        storyName, // Not the inkle one,the DB one.
        paragraphList,
        choices,
        choicesList,
        currentStitch, // (use value of last active?)
        notes
    }*/
    
};

// POST with the story name
const getStoryByName = async (req, res, next) => {
    const { storyName } = req.body;
    const returnedStory = await StoryService.getStoryByName(storyName);
    res.status(200).json({ story: returnedStory });

}

const getStoryById = async (req, res, next) => {
    const storyId = req.params.sid;
    let story; 

    try{
        story = await Story.findById(storyId); // Not a "real" promise, but Mongoose still allows async/await
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find story', 500
        );
        return next(error);
    }
    
    if(!story) {
        const error =  new HttpError('Could not find a story with the specified ID.',
        404
        );
        return next(error);
    }
    res.json({ story: story.toObject({ getters: true }) });

}

const getInitialStitchByName = async (req, res, next) => {

    // Initial stitch is stored in: story.story.data.initial
}

// From a POST: Loads a "blank" run of the story and saves it to the database
const startStorySession = async (req, res, next) => {

    const { creator, story } = req.body;
    
    // DEBUG
    console.log('Starting new story session');

    const createdSession = new StorySession({
        creator,
        story
    });

    let user;

    try {
        user = await Users.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'Creating storysession failed (error when finding ID)',
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
        console.log('Session started.');
        sess.startTransaction();
        await createdSession.save({ session: sess });
        user.storySessions.push(createdSession);
        await user.save({ session: sess });
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError(
            'Creating Storysession has failed',
            500
        );
        return next(error);
    }
    console.log(`Created a Storysession on story "${story}"`);
    res.status(201).json({ storySession: createdSession });

}

// takes a POST with userName and storyName
const getStorySessionByIds = async (req, res, next) => {
    const userId = req.body.userId;
    const storyId = req.body.storyId;
    console.log("Retrieving StorySession for user " + userId + " playing story " + storyId);

    let story;
    let user;
    let storySession;
    try{
        story = await Story.findById(storyId);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find story for storysession', 500
        );
        return next(error);
    }
    
    if(!story) {
        const error =  new HttpError('Could not find a story with the specified ID.',
        404
        );
        return next(error);
    }

    try{
        user = await Users.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find user for storysession', 500
        );
        return next(error);
    }
    
    if(!user) {
        const error =  new HttpError('Could not find a user with the specified ID.',
        404
        );
        return next(error);
    }

    try{
        storySession = await StorySession.findOne({creator: userId, story: storyId });
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find storysession', 500
        );
        return next(error);
    }
    
    if(!storySession) {
        const error =  new HttpError('Could not find a storySession with the specified IDs.',
        404
        );
        return next(error);
    }

    res.json({ storySession: storySession.toObject({getters: true }) });
}

const getStorySessions = async (req, res, next) => {
    let storySessions;
    try {
        storySessions = await StorySession.find({}); // Empty object for projection.
    } catch (err) {
        const error = new HttpError(
            'Fetching story sessions failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ storySessions: storySessions.map(session => session.toObject({getters: true })) });

}


const getStorySessionsByUserID = async (req, res, next) => {

    const userId = req.params.uid;
    let userWithSessions;

    try {
        userWithSessions = await Users.findById(userId).populate('storySessions');
    } catch (err) {
        const error = new HttpError(
            'Fetching storySessions by user ID failed, please try again later',
            500
        );
        return next(error);
    }

    if(!userWithSessions || userWithSessions.storySessions.length === 0) {
        return next(
            new HttpError('Could not find storySessions for the provided user ID.', 404)
        );
    };

    res.json({ storySessions: userWithSessions.storySessions.map(storySession => storySession.toObject({ getters: true })) });
}


// POST request with the username and story of a storysession along with a stitchname for the destination, all as one object.
// TODO: although the individual sessions in here have try-catch and error handling, create higher-level error handling here and transactions
const moveStorySession = async (req, res, next) => {
    console.log(`Parsing request to move story: ${JSON.stringify(req.body)}`)
    // Will take a story session's username and story (ID instead?), and a destination, make the inkle object using the new destination and that session's flaglist (if any), 
    
    const { userId, storyId, destinationStitch } = req.body;

    console.log(`Moving story and getting frontend. userId: ${userId} storyId: ${storyId} destination: ${destinationStitch}`);

    let rawStoryText;
    let fullSession;
    let sessionFlagList;
    let sessionId;
    try {
    rawStoryText = await StoryService.getRawStoryTextById(storyId);
    
    // TODO: Should this also create a new session if one doesn't already exist?
    fullSession = await StorySessionService.getStorySessionByIds(userId, storyId);
    sessionFlagList = fullSession.sessionFlaglist;
    sessionId = fullSession._id;

    } catch (err) {
        return next(err); // TODO: replace this with httpError object and assign its code etc.
    }
    
    console.log("now making inkle object from raw text...")
    // Inklewriter initialization
    let inkle = new libinkle({ source: rawStoryText });

    // Debug:
    console.log('starting new inkle at stitch: ' + destinationStitch + ' with flaglist: ' + sessionFlagList);
    
    inkle.start(destinationStitch, sessionFlagList);

    // It will then get all the story text, choices etc. for its new destination
    const paragraphList = inkle.getText();
    const choices = inkle.getChoices();
    const choicesList = inkle.getChoicesByName();
    const currentStitch = inkle.getCurrentStitchName(); // TODO: This MAY need to be made async so that this happens in the correct order
    const newFlagList = inkle.getFlagList();

    // and then fetch the notes for its new location:
    const location = {
        story: storyId, stitch: currentStitch
    }
    
    let fetchedNotes;
    try {
        fetchedNotes = await NoteService.getNotesByLocation(location);
        console.log(`fetched these notes: ${JSON.stringify(fetchedNotes)}`);
    } catch (err) {
        return next(err); // TODO: replace this with httpError object and write its code etc.
    }


    // Update the story session in question with the new flaglist and currentStitch
    const sessionPayload = { currentStitch, newFlagList }
    let updatedSession;
    try {
        updatedSession = await StorySessionService.updateStorySessionById(sessionId, sessionPayload);
    } catch {
        return next(err); // TODO: replace this with httpError object and write its code etc.
    }
    


    // And finally it will send back the frontend object that corresponds to the story info and notes for this destination.
    let frontEndObject;

    // Populate frontEndObject with all the notes and story details needed
    console.log(`fetched these notes: ${JSON.stringify(fetchedNotes)}`);

    frontEndObject = {
        paragraphList: paragraphList,
        choices: choices,
        choicesList: choicesList,
        fetchedNotes: fetchedNotes.fetchedNotes
    }

    res.json(frontEndObject);
}



exports.getInitialStitchByName = getInitialStitchByName;
exports.getStoryByName = getStoryByName;
exports.createStory = createStory;
exports.getStories = getStories;
exports.startStorySession = startStorySession;
exports.getStoryFrontEndObject = getStoryFrontEndObject; // TODO: this might need to instead be a service? (evaluate need for this to be used in other controllers)
exports.getStorySessionByIds = getStorySessionByIds;
exports.moveStorySession = moveStorySession;
exports.getStorySessionsByUserID = getStorySessionsByUserID;
exports.getStoryById = getStoryById;
exports.getStorySessions = getStorySessions;
