const mongoose = require('mongoose');

const Story = require('../models/stories');

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

const getStoryByName = async (req, res, next) => {
    const storyName = req.body.storyName;
    let returnedStory;
    
    try {
        returnedStory = await Story.find({ name: storyName });
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to get a story by name', 500
        );
        return next(error);
    }
    res.status(200).json({ story: returnedStory });

}

const getInitialStitchByName = async (req, res, next) => {

    // Initial stitch is stored in: story.story.data.initial
}

exports.getInitialStitchByName = getInitialStitchByName;
exports.getStoryByName = getStoryByName;
exports.createStory = createStory;
exports.getStories = getStories;