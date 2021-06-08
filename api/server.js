const express = require('express');
const path = require('path');
const app = express(), port = 3080;
const mongoose = require('mongoose');
const HttpError = require('./models/httpError');
const connectionUrl = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';
const storyHandler = require('./controllers/storyController');
const notesRoutes = require('./routes/notes-routes');


// Inklewriter initialization
const fs = require('fs');
const libinkle = require('libinkle');


// Boolean to show debug features in app

const showTools = true;




/// ---- Experimental session array approach

let storySessions = [];

// Example storysession format:
/*
  {
    "userid": "user123",
    "storymodel" : inkle, // This part will be a libinkle object
    "paragraphList" : [some paragraphs],
    "choices" : [choices],
    "choicesList" : [choices by name],
    "currentStitch" : "someStichName"
  }
*/
/*
const createStorySession = (userID, storyText) => {
  let workingStorySession;

  const newInkle = new libinkle({ source: storyText });
  newInkle.start();

  const newParagraphList = newInkle.getText();
  const newChoices = newInkle.getChoices();
  const newChoicesList = newInkle.getChoicesByName();
  const newCurrentStitch = newInkle.getCurrentStitchName();

  workingStorySession = {
    "userid": userID,
    "storymodel" : newInkle, 
    "paragraphList" : newParagraphList,
    "choices" : newChoices,
    "choicesList" : newChoicesList,
    "currentStitch" : newCurrentStitch
  }

  return workingStorySession;
}

const getStorySession = (userID) => {
  const result = storySessions.filter((storySession) => { return storySession.userid === userID});
  return result[0]; // Presumed to be unique 
};

const moveStorySessionToNewStitch = (userID, destination) => {
  console.log(userID, ' is making choice that leads to ', destination);
  const myInkle = getStorySession(userID).storymodel;
  myInkle.choose(myInkle.getChoicesByName()[destination]);
  const newParagraphList = myInkle.getText();
  const newChoices = myInkle.getChoices();
  const newChoicesList = myInkle.getChoicesByName();
  const newCurrentStitch = myInkle.getCurrentStitchName();

  const modifiedStorySession = {
    "userid": userID,
    "storymodel" : myInkle, 
    "paragraphList" : newParagraphList,
    "choices" : newChoices,
    "choicesList" : newChoicesList,
    "currentStitch" : newCurrentStitch
  }

  storySessions.forEach((storySession, i) => { // Update the value in storysessions
    if(storySession.userid === userID) storySessions[i] = modifiedStorySession;
  });
}


// Placeholder session array initialization
const testBuf = fs.readFileSync('testStory.json');

const testSession = createStorySession("testuser", testBuf.toString());
storySessions.push(testSession);

/// ---- Session array approach ends
*/

// Basic inkle initialization and single-story functions:
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
  //console.log(inkle);
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

