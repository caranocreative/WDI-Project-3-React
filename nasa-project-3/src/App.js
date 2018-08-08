import React, { Component } from 'react';
import './App.css';
import NasaApi from './NasaApi';
import Game from './Game/Game';
import NavbarComponent from './NavbarComponent/Navbar';
import Login from './Login/index';




class App extends Component {
  render() {
    return (
      <div className="App">
        <div><NavbarComponent/></div>
        <div><Login/></div>
        <div><Game/></div>
        <div><NasaApi/></div>
        
        
      
       
        
      </div>
    );
  }
}

export default App;
