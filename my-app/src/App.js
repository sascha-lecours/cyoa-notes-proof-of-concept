import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Book } from './components/Book';

import { getDebugSettings } from './services/AppSettingsService';
import { getMarginNotes } from './services/NotesService.js';
import { getStoryText, resetStory, getCurrentStitch, getCurrentStoryName } from './services/StoryService.js';
import { getChoices, getChoicesList, makeChoice } from './services/ChoiceService.js';


function App() {

  const [currentStoryTitle, setCurrentStoryTitle] = useState(null);
  const [currentStitchName, setCurrentStitchName] = useState(null);

  const [marginNotes, setMarginNotes] = useState([]);
  const [storyText, setStoryText] = useState([]);
  const [choices, setChoices] = useState({});
  const [choicesList, setChoicesList] = useState([]);
  const [needToUpdate, setNeedToUpdate] = useState(true);
  
  const [showDebugTools, setShowDebugTools] = useState(false);
  
  useEffect(() => {
    getCurrentStoryName()
    .then(storyTitle => setCurrentStoryTitle(storyTitle))
  }, []);
  
  useEffect(() => { //TODO: Break these out more finely when the time comes rather than updating all of them every time
    if(!needToUpdate) return;

    getCurrentStitch()
    .then(stitchName => setCurrentStitchName(stitchName));

    if(currentStoryTitle && currentStitchName){
      const currentLocation = { location: { story: currentStoryTitle, stitch: currentStitchName }}
      //console.log(`retieving notes from ${currentStoryTitle}, stitch: ${currentStitchName}`);
      //console.log(`... sending the following to getMarginNotes: ${JSON.stringify(currentLocation)}`);
      getMarginNotes(currentLocation)
      .then(fetchedNotes => {
        //console.log(`...Fetched these notes back: ${JSON.stringify(fetchedNotes)}`);
        const newNotes = fetchedNotes.fetchedNotes;
        setMarginNotes(newNotes);
      });
    }

    if(!showDebugTools) { 
      getDebugSettings()
      .then(showDebugTools => setShowDebugTools(showDebugTools));
    }

    getStoryText()
      .then(text =>{
        //console.log(text);
        setStoryText(text);
      });

    getChoices()
      .then(choices => {
        //console.log(choices);
        setChoices(choices);
      });

    getChoicesList()
      .then(choicesList => {
        //console.log(choicesList);
        setChoicesList(choicesList);
      });

      setNeedToUpdate(false);
  }, [needToUpdate]);

  const makeChoiceAndUpdate = (destination) => {
    makeChoice(destination);
    setNeedToUpdate(true);
  }


// Debugging tools:
const ResetButton = () => {
  return(
    <button type="button" className="btn btn-secondary" onClick={(e)=>{
      resetStory();
      setNeedToUpdate(true);
    }}>Reset story</button>
  );
}

const GetCurrentStitchButton = () => {
  return (
    <button type="button" className="btn btn-info"onClick={(e)=>{
      getCurrentStitch();
      setNeedToUpdate(true);
    }}>Output Current Stitch</button>
  );
}


// Debugging tools end.

    return (
      <div className="App">
        <Header />
        <div className="centralBody">
          <Book 
            marginNotes={marginNotes} 
            storyText={storyText} 
            choices={choices} 
            choicesList={choicesList} 
            makeChoice={makeChoiceAndUpdate}
            currentStitch={currentStitchName}
            currentStory={currentStoryTitle}
          ></Book>
        </div>

        <div>
          { showDebugTools ? <ResetButton /> : null }
          { showDebugTools ? <GetCurrentStitchButton /> : null }
        </div>

        <Footer />
      </div>
  );
}

export default App;
