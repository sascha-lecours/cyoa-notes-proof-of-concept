const Note = require('../models/note');
const HttpError = require('../models/httpError');

const getNotesByLocation = async ( location ) => {
    console.log(`get notes for : ${JSON.stringify(location)}`);
    const storyName = location.story;
    const stitchName = location.stitch;
    
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
        return error;
    }

    return await { fetchedNotes: fetchedNotes.map(note => note.toObject({ getters: true })) };
}

exports.getNotesByLocation = getNotesByLocation;
