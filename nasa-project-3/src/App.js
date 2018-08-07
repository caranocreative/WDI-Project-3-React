import React, { Component } from 'react';
import './App.css';
import NasaApi from './NasaApi';
import MemoryGame from './MemoryGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div><MemoryGame/></div>
        <br></br>
        <br></br>
        <div><NasaApi/></div>
        
      </div>
    );
  }
}

export default App;
