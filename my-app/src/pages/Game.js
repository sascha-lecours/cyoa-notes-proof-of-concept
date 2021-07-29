import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../util/auth-context';
import { StorySessionContext } from '../util/storySession-context';

import LoadingSpinner from '../components/appearance/LoadingSpinner';
import ErrorModal from '../components/appearance/ErrorModal';
import { useHttpClient } from '../util/hooks/httpHook';

import { Footer } from '../components/Footer';
import { Book } from '../components/Book';

import { getDebugSettings } from '../services/AppSettingsService';
import { resetStory } from '../services/StoryService.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const Game = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
  const ssContext = useContext(StorySessionContext);

  const userId = auth.userId;
  const ssid = ssContext.storySessionId;

  const [lastActiveStitch, setLastActiveStitch] = useState(null);
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [currentStitchName, setCurrentStitchName] = useState(null);
  const [marginNotes, setMarginNotes] = useState([]);
  const [storyText, setStoryText] = useState([]);
  const [choices, setChoices] = useState({});
  const [choicesList, setChoicesList] = useState([]);
  const [needToUpdate, setNeedToUpdate] = useState(true);
  const [frontEndObject, setFrontEndObject] = useState(); // To be passed down in a callback function to the choice-maker component
  
  const [showDebugTools, setShowDebugTools] = useState(false);
  

// Take frontend object and use it to set other values as needed.

useEffect(() => {
  if(!needToUpdate) return;
  if(!frontEndObject) return;
  setNeedToUpdate(false);

  let newChoicesList = frontEndObject.choicesList;
  let newChoices = frontEndObject.choices;
  let newStoryText = frontEndObject.paragraphList;
  let newMarginNotes = frontEndObject.fetchedNotes;

  setChoicesList(newChoicesList);
  setChoices(newChoices);
  setStoryText(newStoryText);
  setMarginNotes(newMarginNotes);


}, [needToUpdate, frontEndObject]);


// On load: get last active stitch.

useEffect(() => {

  // Debug tools flag
  if(!showDebugTools) { 
    getDebugSettings()
    .then(showDebugTools => setShowDebugTools(showDebugTools));
  }

  // Gets and sets storySession and then frontend Object
  const fetchInitialFrontEndObject = async () => {
    let retrievedSession;
    try {
      const responseData = await sendRequest(
        `http://localhost:3080/api/story/session/id/${ssid}`
      );

      retrievedSession = responseData;

      setCurrentStoryId(responseData.storySession.story);
      setLastActiveStitch(responseData.storySession.sessionLastActiveStitch);
    } catch (err) {}
    
    try {
      const responseData = await sendRequest(
        `http://localhost:3080/api/story/session/move`,
        'POST',
        JSON.stringify({
          storySessionId: ssid,
          destinationStitch: retrievedSession.storySession.sessionLastActiveStitch 
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      setFrontEndObject(responseData);
      setNeedToUpdate(true);
    } catch (err) {}
  };
  fetchInitialFrontEndObject();
}, [sendRequest, ssid]);



/*
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
*/
  const makeChoiceAndUpdate = async (destination) => {
    console.log(`new destination: ${choicesList[destination]}`)
    try {
      const responseData = await sendRequest(
        `http://localhost:3080/api/story/session/move`,
        'POST',
        JSON.stringify({
          storySessionId: ssid,
          destinationStitch:  choicesList[destination]
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      setFrontEndObject(responseData);
      setNeedToUpdate(true);
    } catch (err) {}
   
    
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

  const triggerUpdateButton = () => {
    return (
      <button type="button" className="btn btn-info" onClick={(e)=>{
        //getCurrentStitch();
        setNeedToUpdate(true);
      }}>Update notes</button>
    );
  }
// Debugging tools end.



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && frontEndObject && 
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
              { showDebugTools ? <triggerUpdateButton /> : null }
            </div>

            <Footer />
          </div>}
    </React.Fragment>
  );
}

export default Game;
