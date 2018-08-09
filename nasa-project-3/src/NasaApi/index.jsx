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
      comments: [],
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
      this.getComments().then((comments)=>{
        console.log("THIS IS COMMENTS")
        console.log(comments);
        this.setState({
          url: data.url,
          explanation: data.explanation,
          date: data.date,
          title: data.title,
          comment: data.comment,
          id: data.id,
          comments: comments.data,
        });
      })
      
    });
  }
  
  
  //like the picture of the day works
  render(props) {   
    console.log(this.state.comments);
    const comments = this.state.comments.map((comment)=>{
      return (
        <li key={comment._id}>
        {/* <img src={comment.url} alt=""/> */}
          <p>{comment.comment}</p><br/>
          {/* <button onClick={props.deleteComment.bind(null, comment._id)}>Delete</button> */}
          {/* <button onClick={props.showModal.bind(null, comment._id)}>Edit</button> */}
      </li>)
    })
 
    return (

      <div>
        <div className="POD-main">
          <h1 className="POD-h1">Out of this World Space Fun</h1>
          <h3 className="POD-h3">NASA Picture of the Day!</h3>
          <iframe className="POD" src={this.state.url} alt=""></iframe>
        </div>
        <div>
          <h2>Add your comments</h2>
          <form onSubmit={this.addComment}>                                                                                          
            <textarea name='comment' onChange={this.handleFormChange} /> 
            <br/>       
            <input type='submit' value='Add Comment'/>
          </form>
        </div>
         <div>
           <h2>COMMENTS</h2>
              <ul>
               {comments}
              </ul>
          </div>
      </div>
     
    );
  }
}
export default NasaApi;
