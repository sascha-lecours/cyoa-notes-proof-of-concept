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

// payload: sessionFlagList, sessionLastActiveStitch, //TODO: maybe a boolean for story completed -> remove session?
const updateStorySessionById = async (id, payload) => {
    console.log(`Update session for ID: ${id}`);
    
    let fetchedSession;
    try{
        fetchedSession = await StorySession.findById(id);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find session by id', 500
        );
        return error;
    }

    fetchedSession.sessionFlagList = payload.sessionFlagList;
    fetchedSession.sessionLastActiveStitch = payload.sessionLastActiveStitch;

    try {
        await fetchedSession.save();
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find session by id', 500
        );
        return error;
    }

    // Returns updated session state
    return await fetchedSession;
}

exports.updateStorySessionById = updateStorySessionById;
exports.getStorySessionByNames = getStorySessionByNames;
