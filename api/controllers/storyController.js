const mongoose = require('mongoose');

const libinkle = require('libinkle');

const Story = require('../models/stories');
const StorySession = require('../models/storySession');
const NoteService = require('../services/noteService');
const StoryService = require('../services/storyService');
const StorySessionService = require('../services/storySessionService');

const url = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    console.log('Connected to database.');
}).catch(()=>{
    console.log('Connection to database failed!');
});

 // TODO: use global connection object and don't connect here specifically

const createStory = async (req, res, next) => {
    const createdStory = new Story({
        name: req.body.name,
        story: req.body.story
    });
    const result = await createdStory.save();
    console.log("Created Story with ID: " + createdStory.id);
    res.json(result); // The entire story that was saved - fairly big.
};

const getStories = async (req, res, next) => { // Array of all stories. Extremely big.
    const stories = await Story.find().exec(); // Mongoose find() is array by default // exec() makes it a 'real' promise
    
    res.json(stories);
};


// Takes in a usersession as an argument and returns a frontendobject
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
    const storyName = req.body.storyName;
    const returnedStory = await StoryService.getStoryByName(storyName);
    res.status(200).json({ story: returnedStory });

}

const getInitialStitchByName = async (req, res, next) => {

    // Initial stitch is stored in: story.story.data.initial
}

// From a POST: Loads a "blank" run of the story and saves it to the database
const startStorySession = async (req, res, next) => {
    let newStorySession = new StorySession({
        userName: req.body.userName,
        storyName: req.body.storyName,
        sessionFlaglist: []
    });
    const result = await newStorySession.save();
    console.log("Created new StorySession for user " + newStorySession.userName + " playing story " + newStorySession.storyName);
    res.json(result);
}

// takes a POST with userName and storyName
const getStorySessionByNames = async (req, res, next) => {
    const userName = req.body.userName;
    const storyName = req.body.storyName;
    console.log("Retrieving StorySession for user " + userName + " playing story " + storyName);

    const result = await StorySessionService.getStorySessionByNames(userName, storyName);
    res.json(result);
}

// POST request with the username and story of a storysession along with a stitchname for the destination, all as one object.
const moveStorySession = async (req, res, next) => {
    
    // Will take a story session's idusername and story, and a destination, make the inkle object using the new destination and that session's flaglist (if any), 
    const userName = req.body.userName;
    const storyName = req.body.storyName;
    const destinationStitch = req.body.destinationStitch;

    const rawStoryText = await StoryService.getRawStoryTextByName(storyName);
    
    // TODO: Should this also create a new session if one doesn't already exist?
    const fullSession = await StorySessionService.getStorySessionByNames(userName, storyName);
    const sessionFlagList = await fullSession.sessionFlaglist;
    const sessionId = await fullSession._id;

    // Inklewriter initialization
    let inkle = new libinkle({ source: rawStoryText });

    //Debug:
    console.log('starting new inkle at stitch: ' + destinationStitch + ' with flaglist: ' + sessionFlagList);
    
    inkle.start(destinationStitch, sessionFlagList);

    // It will then get all the story text, choices etc. for its new destination
    const paragraphList = inkle.getText();
    const choices = inkle.getChoices();
    const choicesList = inkle.getChoicesByName();
    const currentStitch = inkle.getCurrentStitchName(); // This may need to be made async so that this happens in the correct order
    const newFlagList = inkle.getFlagList();

    // and then fetch the notes for its new location:
    const location = {
        story: storyName, stitch: currentStitch
    }

    const fetchedNotes = await NoteService.getNotesByLocation(location);
    
    const sessionPayload = { currentStitch, newFlagList }
    const updatedSession = await StorySessionService.updateStorySessionById(sessionId, sessionPayload);


    // And finally it will send back the frontend object that corresponds to the story info and notes for this destination.
    let frontEndObject;

    // Populate frontEndObject with all the notes and story details needed
    frontEndObject = {
        paragraphList: paragraphList,
        choices: choices,
        choicesList: choicesList,
        fetchedNotes: fetchedNotes.fetchedNotes
    }

    await res.json(frontEndObject);
}



exports.getInitialStitchByName = getInitialStitchByName;
exports.getStoryByName = getStoryByName;
exports.createStory = createStory;
exports.getStories = getStories;
exports.startStorySession = startStorySession;
exports.getStoryFrontEndObject = getStoryFrontEndObject; // TODO: this might need to instead be a service? (evaluate need for this to be used in other controllers)
exports.getStorySessionByNames = getStorySessionByNames;
exports.moveStorySession = moveStorySession;
