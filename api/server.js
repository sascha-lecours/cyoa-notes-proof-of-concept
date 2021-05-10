const express = require('express');
const path = require('path');
const app = express(), port = 3080;

const fs = require('fs');
const libinkle = require('libinkle');

const buf = fs.readFileSync('testStory.json');
const inkle = new libinkle({source: buf.toString()});
console.log(inkle);

inkle.start();
let paragraphList = inkle.getText();
let choicesList = inkle.getChoices();

//console.log(paragraphList);

// placeholder data
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

const marginNotesPlaceholder = [
  {
    key: 1,
    user: 'bob',
    text: 'Watch out for cats'
  },
  {
    key: 2,
    user: 'Samwise31',
    text: 'This is going to be a difficult journey. Try tenacity.'
  },
  {
    key: 3,
    user: 'Saimon',
    text: "Keep at it! Don't give up!"
  }

];

// placeholders end


app.use(express.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/storyText', (req, res) => {
  console.log('api/storyText called!')
  res.json(paragraphList);
});

app.get('/api/marginNotes', (req, res) => {
  console.log('api/marginNotes called!')
  res.json(marginNotesPlaceholder);
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

// -- Old functions end

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});