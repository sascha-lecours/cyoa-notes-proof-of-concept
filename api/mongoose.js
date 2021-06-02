const mongoose = require('mongoose');

const Story = require('./models/stories');

const url = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';

mongoose.connect(url, { useUnifiedTopology: true }).then(()=>{
    console.log('Connected to database.');
}).catch(()=>{
    console.log('Connection to database failed!');
});

const createStory = async (req, res, next) => {
    const createdStory = new Story({
        name: req.body.name,
        story: req.body.story
    });
    const result = await createdStory.save();
    console.log("Created Story with ID: " + createdStory.id);
    res.json(result); // The entire story that was saved - fairly big.
};

const getStories = async (re, res, next) => { // Array of all stories. Extremely big.
    const stories = await Story.find().exec(); // Mongoose find() is array by default // exec() makes it a 'real' promise
    
    res.json(stories);
};

exports.createStory = createStory;
exports.getStories = getStories;