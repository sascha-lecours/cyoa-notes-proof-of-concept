import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Book } from '../components/Book';

import { AuthContext } from '../util/auth-context';
import { getDebugSettings } from '../services/AppSettingsService';
import { getMarginNotes } from '../services/NotesService.js';
import { getStoryText, resetStory, getCurrentStitch, getCurrentStoryName, moveStoryAndGetFrontend } from '../services/StoryService.js';
import { getChoices, getChoicesList, makeChoice } from '../services/ChoiceService.js';

import '../App.css';


const Game = () => {

  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [currentStitchName, setCurrentStitchName] = useState(null);
  const [marginNotes, setMarginNotes] = useState([]);
  const [storyText, setStoryText] = useState([]);
  const [choices, setChoices] = useState({});
  const [choicesList, setChoicesList] = useState([]);
  const [needToUpdate, setNeedToUpdate] = useState(true);
  const [frontEndObject, setFrontEndObject] = useState({}); // To be passed down in a callback function to the choice-maker component
  
  const [showDebugTools, setShowDebugTools] = useState(false);
  
  const auth = useContext(AuthContext);

  useEffect(() => {
    getCurrentStoryName()
    .then(storyTitle => setCurrentStoryId(storyTitle));
  }, []);

  // The frontend state object (frontEndObject) will be saved in the method that moves the story, and then drawn from here.
  
  useEffect(() => { // TODO: Break these out more finely when the time comes rather than updating all of them every time
    if(!needToUpdate) return;

    if(!showDebugTools) { 
      getDebugSettings()
      .then(showDebugTools => setShowDebugTools(showDebugTools));
    }

    getCurrentStitch()
    .then(stitchName => setCurrentStitchName(stitchName));

    if(currentStoryId && currentStitchName){
      const currentLocation = { location: { story: currentStoryId, stitch: currentStitchName }}
      getMarginNotes(currentLocation)
      .then(fetchedNotes => {
        const newNotes = fetchedNotes.fetchedNotes;
        setMarginNotes(newNotes);
      });
    }



    getStoryText()
      .then(text =>{
        //console.log(text);
        setStoryText(text);
      });

      // TODO: also get current username and add to the state

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

  const makeChoiceAndUpdate = async (destination) => {
    let frontEndObj = await moveStoryAndGetFrontend(auth.userId, currentStoryId, destination);  // TODO: get current story ID better
    setNeedToUpdate(true);
    setFrontEndObject(frontEndObj);
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
    <button type="button" className="btn btn-info" onClick={(e)=>{
      getCurrentStitch();
      setNeedToUpdate(true);
    }}>Update notes</button>
  );
}

// Debugging tools end.
// Removed <Header />
    return (
      <div className="Game">
        
        <div className="centralBody">
          <Book 
            marginNotes={marginNotes} 
            storyText={storyText} 
            choices={choices} 
            choicesList={choicesList} 
            makeChoice={makeChoiceAndUpdate}
            currentStitch={currentStitchName}
            currentStory={currentStoryId}
            setFrontEndObject={setFrontEndObject}
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

export default Game;