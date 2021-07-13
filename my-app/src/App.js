import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

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

  return (
    <AuthContext.Provider 
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/" exact>
          <Game />
        </Route>
        <Redirect to="/" />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
