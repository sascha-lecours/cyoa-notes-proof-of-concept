const express = require('express');
const path = require('path');
const app = express(), port = 3080;
const mongoose = require('mongoose');

const connectionUrl = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';
//const mongoHandler = require('./mongoose');


// Inklewriter initialization
const fs = require('fs');
const libinkle = require('libinkle');

const buf = fs.readFileSync('testStory.json');
let inkle = new libinkle({source: buf.toString()});

inkle.start();
let paragraphList = inkle.getText();
let choices = inkle.getChoices();
let choicesList = inkle.getChoicesByName();

const moveToNewStitch = () => {
  paragraphList = inkle.getText();
  choices = inkle.getChoices();
  choicesList = inkle.getChoicesByName();
}

const resetStory = () => {
  inkle = new libinkle({source: buf.toString()});
  inkle.start();
  moveToNewStitch();
};




// placeholder data
const marginNotesPlaceholder = [
  {
    id: 1,
    user: 'bob',
    text: 'Watch out for cats'
  },
  {
    id: 2,
    user: 'Samwise31',
    text: 'This is going to be a difficult journey. Try tenacity.'
  },
  {
    id: 3,
    user: 'Saimon',
    text: "Keep at it! Don't give up!"
  }
];

// placeholders end


// api paths

app.use(express.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

//app.post('/api/story', mongoHandler.createStory);

//app.get('/api/story', mongoHandler.getStories); 

app.get('/api/storyText', (req, res) => {
  console.log('api/storyText called!')
  res.json(paragraphList);
});

app.get('/api/marginNotes', (req, res) => {
  console.log('api/marginNotes called!')
  res.json(marginNotesPlaceholder);
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


// -- Old functions:

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user added");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

const users = [
  {
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com"
  },
  {
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com"
  }
];

// -- Old functions end

// Start listening

mongoose
.connect(connectionUrl)
.then(()=>{
  app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
  });
})
.catch(error => {
  console.log(error);
});

