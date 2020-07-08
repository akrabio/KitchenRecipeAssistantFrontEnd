import React from 'react';
import './App.css';
import Main from "./Pages/main"
import SpeechRecognition from "react-speech-recognition";
import PropTypes from "prop-types"
import 'bootstrap/dist/css/bootstrap.min.css';
import dotenv from "dotenv";

dotenv.config();

let loggedIn = false;

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
};

const options = {
  autoStart: false,
  continuous: false
}


function App(transcript) {
  if(!loggedIn) {
    let username = prompt('Username:', '');
    let password = prompt('Password:', '');
    if(!process.env.REACT_APP_CREDS.split(",").includes(username+password)) {
        window.alert('Login failed!');
        return (<div>Login Failed</div>)
    } else {
      loggedIn = true;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
       <Main transcript={transcript}></Main>
      </header>
    </div>
  );

}
App.propTypes = propTypes;

export default SpeechRecognition(options)(App);
