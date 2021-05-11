import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Placeholders, to be removed
import { Users } from './components/oldComponents/Users'
import { DisplayBoard } from './components/oldComponents/DisplayBoard'
import CreateUser from './components/oldComponents/CreateUser'
import { getAllUsers, createUser } from './services/UserService'
// placeholders end

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Book } from './components/Book';

import { getMarginNotes } from './services/MarginNotesService';
import { getStoryText } from './services/StoryTextService';


function App() {

  const [marginNotes, setMarginNotes] = useState([]);
  const [storyText, setStoryText] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    getMarginNotes()
      .then(notes => {
        console.log(notes)
        setMarginNotes(notes);
      });
  }, []);

/*
  // Placeholders begin
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState(0)


  const userCreate = (e) => {

      createUser(user)
        .then(response => {
          console.log(response);
          setNumberOfUsers(numberOfUsers+1)
      });
  }

  const fetchAllUsers = () => {
    getAllUsers()
      .then(users => {
        console.log(users)
        setUsers(users);
        setNumberOfUsers(users.length)
      });
  }

  useEffect(() => {
    getAllUsers()
      .then(users => {
        console.log(users)
        setUsers(users);
        setNumberOfUsers(users.length)
      });
  }, [])

  const onChangeForm = (e) => {
      if (e.target.name === 'firstname') {
          user.firstName = e.target.value;
      } else if (e.target.name === 'lastname') {
          user.lastName = e.target.value;
      } else if (e.target.name === 'email') {
          user.email = e.target.value;
      }
      setUser(user)
  }
  // Placeholders end
  
    return (
        <div className="App">
          <Header></Header>
          <div className="container mrgnbtm">
            <div className="row">
              <div className="col-md-8">
                  <CreateUser 
                    user={user}
                    onChangeForm={onChangeForm}
                    createUser={userCreate}
                    >
                  </CreateUser>
              </div>
              <div className="col-md-4">
                  <DisplayBoard
                    numberOfUsers={numberOfUsers}
                    getAllUsers={fetchAllUsers}
                  >
                  </DisplayBoard>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            <Users users={users}></Users>
          </div>
        </div>
    );
    */

    return (
      <div className="App">
        <Header></Header>
        <div className="centralBody">
          <Book marginNotes={marginNotes} getStoryText={storyText}></Book>
        </div>
        <Footer></Footer>
      </div>
  );
}

export default App;
