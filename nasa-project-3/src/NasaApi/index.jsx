import React, { Component } from 'react';
import './style.css';



class NasaApi extends Component {
  constructor(props){
    super(props);

    this.state = {
      url: '',
      explanation: '',
      date: '',
      title: '',
      comment: [],
      id: '',
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
      console.log(err, ' error in catch block')
    }
  }
  
  addComment = async (e) => {
   //console.log("add new comment");
    e.preventDefault();
    // console.log(this.state.url);
    // console.log("ADDING A PICTURE");
    try {
      // const imageToCreate = {"imageUrl":  this.state.url};
      const createdComment = await fetch('http://localhost:9000/api/v1/pictures', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data = await createdComment.json()
        this.setState({
          id: data.data._id
        }) 
        console.log(data.data._id);
    } catch(err) {
      console.log(err)
    }
  }
  
  getComments = async () => {

    const comments = await fetch('http://localhost:9000/api/v1/pictures/');
    const commentsJson = await comments.json();
    return commentsJson

  }

 editComment = async (id, e) => {
    console.log('inside function');
    e.preventDefault();
    try {
      const addToCommentsArray = await fetch('http://localhost:9000/api/v1/pictures/' + id, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      // const editResponseJson = await editResponse.json();
      // const editCommentsArray = this.comment.map((_comment) => { 
      //   if(this.comment.id === this.state){
      //     this.comment = editResponseJson.data.comment;   
      //   }
      //     return editCommentsArray
      // })
    } catch(err) {
      console.log(err);
    }
  } 
  handleFormChange = (e) => {

    this.setState({
      
    
        [e.target.name]: e.target.value
    
    })
  } 
  componentDidMount(){
    this.nasaPicOfDay().then((data) => {
      console.log(data, ' this is data');
      this.setState({
        url: data.url,
        explanation: data.explanation,
        date: data.date,
        title: data.title,
        comment: data.comment,
        id: data.id,
        
      });
    });
  }
  
  
  //like the picture of the day works
  render(props) {   
  //   let s = "";
  //   for(let i = 0; i < this.state.getComments.length; i++)  {
  //     s += `
  //     <form>
  //       <textarea value={this.state.comment[i]}/>
  //       <input type='submit' value='Edit Comment'/>
  //       <input type='submit' value='Delete Comment'/>
  //     </form>`
  //  }
    
    return (
      <div className="mainContainer"> 
      <div className="row">
      <div className="side">
        
        <div>
        <div className="POD-main">
        <h1 className="POD-h1">Out of this World Space Fun</h1>
        <h3 className="POD-h3">NASA Picture of the Day!</h3>
        <iframe className="POD" src={this.state.url} alt=""></iframe>
        </div>
        
        {/* <div>
          <h2>Like the Picture of the day</h2>
          <form onSubmit={this.addPicture}>
            <input type='hidden' name='url' value={this.state.url}/>
            <input type='hidden' name='explanation' value={this.state.explanation}/>
            <input type='hidden' name='title' value={this.state.title}/>
            <input type='hidden' name='date' value={this.state.date}/>
            <input type='submit' value='Like'/>
          </form>
        </div> */}
        
        <br/>
        
        <div>
          <h2>Add your comments</h2>
          <form onSubmit={this.addComment}>                                                                                          
            <textarea name='comment' onChange={this.handleFormChange} /> 
            <br/>       
            <input type='submit' value='Add Comment'/>
            <div>
            <br/>
            </div>
          </form>
        </div>
          
          {/* <div>
            <h2>Review Comments</h2>
            {s}     
          </div>  */}
         
         <div>
           <h2>COMMENTS</h2>
          <div >

          </div>
        </div>


      </div>
      </div>
      </div>
      </div>
    );
  }
}
export default NasaApi;
