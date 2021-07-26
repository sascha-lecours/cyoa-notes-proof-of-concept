const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const HttpError = require('./models/httpError');
const notesRoutes = require('./routes/notes-routes');
const userRoutes = require('./routes/user-routes');
const storyRoutes = require('./routes/story-routes');

const app = express(), port = 3080;

const connectionUrl = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';


// Inklewriter initialization
const fs = require('fs');
const libinkle = require('libinkle');


// Boolean to show debug features in app

const showTools = false;


// Basic inkle initialization and single-story functions:
const buf = fs.readFileSync('testStory.json');
let inkle = new libinkle({ source: buf.toString() });

// This variant starts at the default stitch, with preset list of flags: inkle.start(null, testFlagList);
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
  inkle = new libinkle({ source: buf.toString() });
  inkle.start();
  moveToNewStitch();
};



// api paths

app.use(express.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

// CORS handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/notes', notesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/story', storyRoutes);





app.get('/api/showDebugTools', (req, res) => {
  console.log('Show debug tools: ' + showTools);
  res.json(showTools);
});

app.get('/api/reset', (req, res) => {
  resetStory();
  console.log('Resetting story...');
  res.json('Story reset.');
});

// TODO: This can be removed when refactored out
app.post('/api/makechoice', (req, res) => {
    const destination = req.body.destination;
    console.log('Making choice that leads to ', destination);
    inkle.choose(inkle.getChoicesByName()[destination]);
    moveToNewStitch();
    res.json("Choice made.");
  });

// -- End of section that needs to be refactored (Replaced with routes) --


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Start listening

mongoose
.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
  });
})
.catch(err => {
  console.log(err);
});

