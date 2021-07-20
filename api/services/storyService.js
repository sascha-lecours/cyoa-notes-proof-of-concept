const Stories = require('../models/stories');
const HttpError = require('../models/httpError');

const getStoryByName = async (name) => {
    console.log(`get story text for : ${name}`);
    
    let fetchedStory = {};
    try{
        fetchedStory = await Stories.find({ name });
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find story by name', 500
        );
        return error;
    }

    return await { fetchedStory };
}

const getRawStoryTextByName = async (name) => {
    console.log(`geting RAW story text for : ${name}`);
    
    let fetchedStory = {};
    try{
        fetchedStoryArray = await Stories.find({ name });
        fetchedStory =  JSON.stringify(fetchedStoryArray[0].story);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to get raw story text story by name', 500
        );
        return error;
    } 

    return await fetchedStory;
}

const getRawStoryTextById = async (storyId) => {
    console.log(`geting RAW story text for : ${storyId}`);
    
    let fetchedStory = {};
    try{
        fetchedStory = await Stories.findById(storyId);
        fetchedStory = JSON.stringify(fetchedStoryArray.story);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to get raw story text story by Id', 500
        );
        return error;
    } 

    return await fetchedStory;
}

exports.getStoryByName = getStoryByName;
exports.getRawStoryTextByName = getRawStoryTextByName;
exports.getRawStoryTextById = getRawStoryTextById;
