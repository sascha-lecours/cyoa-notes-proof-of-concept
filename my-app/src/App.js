import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './components/navigation/MainNavigation.js';
import Game from './pages/Game';
import Auth from './pages/Auth';
import Users from './pages/Users';
import ChooseStory from './pages/ChooseStory.js';
import ChooseSession from './pages/ChooseSession.js';
import UserNotes from './pages/UserNotes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthContext } from './util/auth-context.js';
import { StorySessionContext } from './util/storySession-context.js';



// TODO: remaining nav options: view my notes. (bonus: continue previous story)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);


  const [isInStorySession, setIsInStorySession] = useState(false);
  const [storySessionId, setStorySessionId] = useState(null);

  const enterStorySession = useCallback((ssid) => {
    setIsInStorySession(true);
    setStorySessionId(ssid);
  }, []);

  const exitStorySession = useCallback(() => {
    setIsInStorySession(false);
    setStorySessionId(null);
  }, []);

  let routes;
  // TODO: Change "/" path for authenticated route to be story-choose rather than game
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <ChooseStory />
        </Route>
        <Route path="/game" exact>
          <Game />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/my-notes" exact>
          <UserNotes />
        </Route>
        <Route path="/story-sessions" exact>
          <ChooseSession />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <hr />
          <hr />
          <hr />
          <h1> You need to log in bro </h1>
          <hr />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn: isLoggedIn, 
        userId: userId, 
        login: login, 
        logout: logout,  
      }}
    >
      <StorySessionContext.Provider 
        value={{
          isInStorySession: isInStorySession, 
          storySessionId: storySessionId, 
          enterStorySession: exitStorySession, 
          exitStorySession: exitStorySession,  
        }}
      >
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
        </Router>
      </StorySessionContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
