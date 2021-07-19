import React from 'react';

import StoryItem from './StoryItem';
import Card from './Card';
import './appearance/StoryList.css';

const StoryList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="Story-list">
      {props.items.map(story => (
        <StoryItem
          key={story.id}
          id={story.id}
          image={story.image}
          name={story.name}
        />
      ))}
    </ul>
  );
};

export default StoryList;
