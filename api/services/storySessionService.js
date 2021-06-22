const StorySession = require('../models/storySession');
const HttpError = require('../models/httpError');

const getStorySessionByNames = async (userName, storyName) => {
    console.log(`get session values for : ${userName}'s session of ${storyName}`);
    
    let fetchedSession;
    try{
        fetchedSession = await StorySession.find({ userName, storyName });
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find story session by names', 500
        );
        return error;
    }
    console.log("flaglist for this session is: " + fetchedSession[0].sessionFlaglist);
    return await fetchedSession[0];
}

exports.getStorySessionByNames = getStorySessionByNames;
