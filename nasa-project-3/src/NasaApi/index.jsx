import React, { Component } from 'react';
import './style.css';



class NasaApi extends Component {
  constructor(){
    super();

    this.state = {
      url: [],
      explanation: '',
      date: '',
      title: ''
    };
  }
  
  nasaPicOfDay = async () => {
    try {
      const nasa = await fetch('https://api.nasa.gov/planetary/apod?api_key=DaNmZXbcjmqfmpWlERVfBHfeuGK3Dw3jJrL0zr8C');
      const nasaJson = await nasa.json();
      //console.log(nasaJson, ' this is nasa pic of day');
      return nasaJson;
      
    } catch(err) {
      return err;
      //console.log(err, ' error in catch block')
    }
  }
  componentDidMount(){
    this.nasaPicOfDay().then((data) => {
      console.log(data, ' this is data');
      this.setState({url: data.url});
    });
  }
  render() {   
    return (
      <div>
        <h1 class="POD-h1">Space Fun</h1>
        <h3 class="POD-h3">NASA Picture of the Day!</h3>
        <img class="POD" src={this.state.url}/>
      </div>
    );
  }
}
export default NasaApi;
