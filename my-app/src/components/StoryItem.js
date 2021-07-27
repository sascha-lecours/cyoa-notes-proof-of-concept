import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Avatar from './Avatar';
import Card from './Card';
import ErrorModal from './appearance/ErrorModal';
import LoadingSpinner from './appearance/LoadingSpinner';

import { useHttpClient } from '../util/hooks/httpHook';
import { AuthContext } from '../util/auth-context';
import { StorySessionContext } from '../util/storySession-context';

import './appearance/StoryItem.css';



// Todo: update link to start or continue a story session with that entry and move to Game page
// ...onClick function should first create new storysession, then if successful then update auth context's storySessionId 
// .. and then redirect to Game page.


const StoryItem = props => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const ssContext = useContext(StorySessionContext);
  const [ needRedirect, setNeedRedirect ] = useState(false);


  // TODO: move more of this logic into the controller rather than this component
  const createOrResumeStorySession = async (storyId) => {
    
    // First, check for an existing session for this user/story combo
    let existingSession;
    try {
      existingSession = await sendRequest(
        `http://localhost:3080/api/story/session/ids`,
        'POST',
        JSON.stringify({
          userId: auth.userId,
          storyId: storyId
        }),
        { 'Content-Type': 'application/json' }
      );
      console.log(`existing session: ${JSON.stringify(existingSession)}`);
      if(existingSession.storySession) {
        ssContext.enterStorySession(existingSession.storySession.id);
        setNeedRedirect(true);
      }
    } catch (err) {}

    

    // Create session if one didn't already exist
    if(!existingSession){
      console.log(`No existing session found, trying to make a new one`);
      try {
        const responseData = await sendRequest(
          `http://localhost:3080/api/story/session/start`,
          'POST',
          JSON.stringify({
            creator: auth.userId,
            story: storyId
          }),
          { 'Content-Type': 'application/json' }
        );
        ssContext.enterStorySession(responseData.storySession.id);
        setNeedRedirect(true);
        // TODO: Return response value here in case it's ever needed?
      } catch (err) {}
    }

  }

  return (
    <li className="story-item">
      <ErrorModal error={error} onClear={clearError} />
      <Card className="story-item__content">
          {isLoading && <LoadingSpinner asOverlay />} 
          <div className="story-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="story-item__info">
            <h2>{props.name}</h2>
          </div>
          <div className="story-item__info">
            <button 
              type="button" 
              className="btn btn-info" 
              onClick={(e)=>{
                createOrResumeStorySession(props.id);
            }}>
              Enter Story
            </button>
          </div>
          {props.shortText && (
            <div className="story-item__info">
              <h4>{props.shortText}</h4>
            </div>
          )}
      </Card>
      {needRedirect && <Redirect to="/game" />}
    </li>
  );
};

export default StoryItem;
