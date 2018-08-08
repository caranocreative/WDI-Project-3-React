import React, { Component } from 'react';
import './style.css';



class NasaApi extends Component {
  constructor(props){
    super(props);

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
  addPicture = async (e) => {
    e.preventDefault();
    try {
        const createdPicture = await fetch('http://localhost:9000/api/v1/pictures/new', {
          method: 'POST',
          body: JSON.stringify(this.state.url),
          headers:{
            'Content-Type': 'application/json'
          }
        });
    } catch(err) {
      console.log(err)
    }
  }
  componentDidMount(){
    this.nasaPicOfDay().then((data) => {
      console.log(data, ' this is data');
      this.setState({url: data.url});
    });
  }
  render(props) {   
    return (
      <div className="row">
      <div className="side">
      <div>
        <h1 className="POD-h1">Space Fun</h1>
        <h3 className="POD-h3">NASA Picture of the Day!</h3>
        <iframe className="POD" src={this.state.url} alt=""></iframe>
        
        <form onSubmit={this.props.addPicture}>
          <input type='hidden' name='url' value={this.state.url}/>
          <input type='submit' value='Like'/>
        </form>
        
      </div>
      </div>
      </div>
    );
  }
}
export default NasaApi;
