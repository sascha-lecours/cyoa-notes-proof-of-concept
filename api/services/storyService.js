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

exports.getStoryByName = getStoryByName;
