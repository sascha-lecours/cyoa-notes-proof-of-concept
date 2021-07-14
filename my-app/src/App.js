import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './components/navigation/MainNavigation.js';
import Game from './pages/Game.js';
import Auth from './pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthContext } from './util/auth-context.js';



// TODO: nav options: choose story, sign in, sign out, view my notes. (bonus: continue previous story)

const App = () => {
  const [isLoggedIn, setIsLoggedin] = useState(false);

  const login = useCallback(() => {
    setIsLoggedin(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedin(false);
  }, []);

  let routes;
  // TODO: Add "my notes" route to logged in switch
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Game />
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
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    <AuthContext.Provider 
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
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
