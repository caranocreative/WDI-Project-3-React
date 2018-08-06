import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import NasaApi from './NasaApi';
import GameContainer from './GameContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NasaApi/>
      </div>
    );
  }
}

export default App;
