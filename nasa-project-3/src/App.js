import React, { Component } from 'react';
import './App.css';
import NasaApi from './NasaApi';
import Game from './Game/Game';
import NavbarComponent from './NavbarComponent/Navbar';
import SpacePictures from './SpacePictures/index';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div><NavbarComponent/></div>
        
        <div><Game/></div>
        <div><NasaApi/></div>
        <div><SpacePictures/></div>
        
        
        
      
       
        
      </div>
    );
  }
}

export default App;
