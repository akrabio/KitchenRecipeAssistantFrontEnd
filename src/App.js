import React from 'react';
import './App.css';
import Main from "./Pages/main"
import SpeechRecognition from "react-speech-recognition";
import PropTypes from "prop-types"

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string
};

function App(transcript) {

  return (
    <div className="App">
      <header className="App-header">
       <Main transcript={transcript}></Main>
      </header>
    </div>
  );
}

App.propTypes = propTypes;

export default SpeechRecognition(App);
