import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

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

  const createNewStorySession = async (storyId) => {
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
      // TODO: Return response value here in case it's ever needed?
    } catch (err) {}
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
                createNewStorySession(props.id);
                // TODO: Handle redirect to GAME page here
            }}>
              Begin
            </button>
          </div>
          {props.shortText && (
            <div className="story-item__info">
              <h4>{props.shortText}</h4>
            </div>
          )}
      </Card>
    </li>
  );
};

export default StoryItem;
