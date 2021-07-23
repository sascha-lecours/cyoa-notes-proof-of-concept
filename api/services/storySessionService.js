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


// payload: newFlagList, currenStitch, //TODO: maybe a boolean for story completed -> remove session?
const updateStorySessionById = async (id, payload) => {
    console.log(`Update session for ID: ${id}, payload: ${JSON.stringify(payload)}`);
    
    let fetchedSession;
    try{
        fetchedSession = await StorySession.findById(id);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find session by id', 500
        );
        return error;
    }


    try {
        //console.log(`Modifying storysession with the payload contents: ${payload.newFlagList} and last active stitch ${payload.currentStitch}`);   
        //fetchedSession.set({ sessionFlaglist : payload.newFlagList });
        fetchedSession.set({ sessionFlaglist : [...payload.newFlagList] });
        fetchedSession.sessionLastActiveStitch = payload.currentStitch;
        //console.log(`Now updating session to use flaglist: ${fetchedSession.sessionFlagList} and last active stitch: ${fetchedSession.sessionLastActiveStitch}`);   
        //console.log(`Post changes: Full session is: ${JSON.stringify(fetchedSession)}`);
        await fetchedSession.save();
        //console.log(`Finally, Post save: Full session is: ${JSON.stringify(fetchedSession)}`);
    } catch (err) {
        const error = new HttpError(
            'Error when attempting update session', 500
        );
        return error;
    }

    // Returns updated session state
    return await fetchedSession;
}

exports.updateStorySessionById = updateStorySessionById;
exports.getStorySessionByNames = getStorySessionByNames;
