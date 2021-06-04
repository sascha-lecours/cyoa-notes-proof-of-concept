const express = require('express');
const path = require('path');
const app = express(), port = 3080;
const mongoose = require('mongoose');

const connectionUrl = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';
const notesRoutes = require('./routes/notes-routes');

const storyHandler = require('./controllers/storyController');

// Boolean to show debug features in app

const showTools = true;

// Inklewriter initialization
const fs = require('fs');
const libinkle = require('libinkle');

const buf = fs.readFileSync('testStory.json');
let inkle = new libinkle({ source: buf.toString() });

inkle.start();
let paragraphList = inkle.getText();
let choices = inkle.getChoices();
let choicesList = inkle.getChoicesByName();
let currentStitch = inkle.getCurrentStitchName();

const moveToNewStitch = () => {
  paragraphList = inkle.getText();
  choices = inkle.getChoices();
  choicesList = inkle.getChoicesByName();
  currentStitch = inkle.getCurrentStitchName();
}

const resetStory = () => {
  inkle = new libinkle({source: buf.toString()});
  inkle.start();
  moveToNewStitch();
};

// Placeholders

const placeHolderStoryTitle = "Hunt for M. Big Foot" // TODO: This is a placeholder until story IDs are finalized

// placeholders end


// api paths

app.use(express.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.use('/api/notes', notesRoutes);


app.post('/api/story', storyHandler.createStory);
app.get('/api/story', storyHandler.getStories); 
app.get('/api/showDebugTools', (req, res) => {
  console.log('Show debug tools: ' + showTools);
  res.json(showTools);
});


app.get('/api/storyText', (req, res) => {
  console.log('api/storyText called!')
  res.json(paragraphList);
});


app.get('/api/currentStoryName', (req, res) => {
  res.json(placeHolderStoryTitle);
});

app.get('/api/choices', (req, res) => {
  console.log('api/choices called!')
  res.json(choices);
});

app.get('/api/reset', (req, res) => {
  resetStory();
  console.log('Resetting story...');
  res.json('Story reset.');
});

app.get('/api/currentStitch', (req, res) => {
  console.log('Current stitch: ' + currentStitch);
  res.json(currentStitch);
});

app.get('/api/choiceslist', (req, res) => {
  console.log('api/choiceslist called!')
  res.json(choicesList);
});


app.post('/api/makechoice', (req, res) => {
    const destination = req.body.destination;
    console.log('Making choice that leads to ', destination);
    inkle.choose(inkle.getChoicesByName()[destination]);
    moveToNewStitch();
    res.json("Choice made.");
  });

// Start listening

mongoose
.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
  });
})
.catch(error => {
  console.log(error);
});

