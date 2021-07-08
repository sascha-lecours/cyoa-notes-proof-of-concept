import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './pages/Game.js';


const App = () => {
  return <Router>
    <Route path="/">
      <Game />
    </Route>
  </Router>;
}

export default App;
