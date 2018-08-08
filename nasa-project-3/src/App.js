import React, { Component } from 'react';
import './App.css';
import NasaApi from './NasaApi';
import Game from './Game/Game';


//<div><MainContainer/></div>  PUT THIS IN RENDER WHEN YOU START USING MAIN CONTAINER

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <div><Game/></div>
        <br/>
        <br/>
        <div><NasaApi/></div>
      
       
        
      </div>
    );
  }
}

export default App;
