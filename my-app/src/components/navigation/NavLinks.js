import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../util/auth-context';
import { StorySessionContext } from '../../util/storySession-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  const ssContext = useContext(StorySessionContext);

  return (
    <ul className="nav-links">
      {ssContext.isInStorySession && (
        <li>
          <NavLink to="/game" exact>
            RETURN TO STORY
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/stories" exact>
            CHOOSE STORY
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/users" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/my-notes">MY NOTES</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
