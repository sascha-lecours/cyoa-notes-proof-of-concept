import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Game from './pages/Game.js';
import Auth from './pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



// TODO: nav options: choose story, sign in, sign out, view my notes. (bonus: continue previous story)

const App = () => {
  return <Router>
    <Route path="/auth">
      <Auth />
    </Route>
    <Route path="/" exact>
      <Game />
    </Route>
    <Redirect to="/" />
  </Router>;
}

export default App;
