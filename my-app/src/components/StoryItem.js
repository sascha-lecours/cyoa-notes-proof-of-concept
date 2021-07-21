import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Card from './Card';
import './appearance/StoryItem.css';



// Todo: update link to start or continue a story session with that entry and move to Game page
// ...onClick function should first create new storysession, then if successful then update auth context's storySessionId 
// .. and then redirect to Game page.


const StoryItem = props => {
  return (
    <li className="story-item">
      <Card className="story-item__content">
          <div className="story-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="story-item__info">
            <h2>{props.name}</h2>
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
