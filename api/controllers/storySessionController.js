const { validationResult } = require('express-validator');
const StorySession = require('../models/storySession');
const HttpError = require('../models/httpError');
const mongoose = require('mongoose');
const storyController = require('./storyController');

// From a POST: Loads a "blank" run of the story and saves it to the database
const startStorySession = async (req, res, next) => {
    let newStorySession = new StorySession({
        userId: req.body.userId,
        storyName: req.body.storyName 
        // Not yet creating flaglist and active stitch
    });
    const result = await createdStorySession.save();
    console.log("Created StorySession for user " + createdStorySession.userName + " playing story " + createdStorySession.storyName);
    res.json(result);
}

exports.startStorySession = startStorySession;