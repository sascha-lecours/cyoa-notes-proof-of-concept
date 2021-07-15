import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Card from './Card';
import './appearance/UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/notes`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.noteCount} {props.noteCount === 1 ? 'Note' : 'Notes'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;