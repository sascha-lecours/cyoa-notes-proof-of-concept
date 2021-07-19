import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Card from './Card';
import './appearance/StoryItem.css';



// Todo: update link to start or continue a story session with that entry and move to Game page
const StoryItem = props => {
  return (
    <li className="story-item">
      <Card className="story-item__content">
        <Link to={`/${props.id}/notes`}>
          <div className="story-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="story-item__info">
            <h2>{props.name}</h2>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default StoryItem;
