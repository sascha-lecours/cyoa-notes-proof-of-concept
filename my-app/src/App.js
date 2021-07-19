import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './components/navigation/MainNavigation.js';
import Game from './pages/Game';
import Auth from './pages/Auth';
import Users from './pages/Users';
import ChooseStory from './pages/ChooseStory.js';
import ChooseSession from './pages/ChooseSession.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthContext } from './util/auth-context.js';



// TODO: remaining nav options: view my notes. (bonus: continue previous story)

const App = () => {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedin(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedin(false);
    setUserId(null);
  }, []);

  let routes;
  // TODO: Add "my notes" route to logged in switch
  // TODO: Change "/" path for authenticated route to be story-choose rather than game
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Game />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/storySessions" exact>
          <ChooseSession />
        </Route>
        <Route path="/stories" exact>
          <ChooseStory />
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
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
