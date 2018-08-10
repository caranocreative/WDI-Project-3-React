import React, { Component } from 'react';
import './style.css';
import EditComment from '../EditComment/editComment';


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
      showEdit: false,
      editCommentId: null,
      commentToEdit: [],
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
        console.log(data.data._id );
    } catch(err) {
      console.log(err)
    }
  }
  
  getComments = async () => {

    const comments = await fetch('http://localhost:9000/api/v1/pictures/');
    const commentsJson = await comments.json();
    return commentsJson

  }

 editComment = async (e) => {
    console.log('inside function');
    e.preventDefault();
    try {
      const addToCommentsArray = await fetch('http://localhost:9000/api/v1/pictures/' + this.state.editCommentId, {
        method: 'PUT',
        body: JSON.stringify(this.state.editCommentId),
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

      this.setState({
        commentToEdit: this.comments,
        showEdit: false,
        
       });

    } catch(err) {
      console.log(err);
    }
  }
  deleteComment = async (id, e) => {
    console.log(id, ' this is id')
    e.preventDefault();
    try {
        const deleteComment = await fetch('http://localhost:9000/api/v1/pictures/' + id, {
          method: 'DELETE'
        });
        console.log('inside try')
        const deleteCommentJson = await deleteComment.json();
        this.setState({comments: this.state.comments.filter((comments, i) => comments._id !== id)});
    } catch(err) {
      console.log(err, ' error')
    }
  }
  showModal = (id, e) => {
    // i comes before e, when called with bind
    let commentToEdit = this.state.comments.find((comment) => comment._id === id)
    commentToEdit = commentToEdit.comment;
    console.log('comment to edit start ', commentToEdit, ' commentToEdit');
    this.setState({
      commentToEdit: commentToEdit,
      showEdit: true,
      editCommentId: id,

    });
  } 
  handleFormChange = (e) => {

    this.setState({  
        [e.target.name]: e.target.value
    
    })
  } 
  componentDidMount(){
    this.nasaPicOfDay().then((data) => {
      //console.log(data, ' this is data');
      this.getComments().then((comments)=>{
        //console.log("THIS IS COMMENTS")
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
        <li className="list" key={comment._id}>
        {/* <img src={comment.url} alt=""/> */}
          <p>{comment.comment}</p>
          <button onClick={this.deleteComment.bind(null, comment._id)}>Delete</button>
          <button onClick={this.showModal.bind(null, comment._id)}>Edit</button>
      </li>)
    })
 
    return (

      <div>
        <br/>
        <br/>
        <br/>
        <div className="POD-main">
          <h1 className="POD-h1" >NASA Picture of the Day!</h1>
          <h3 className="POD-h3"></h3>
          <iframe className="POD" src={this.state.url} alt=""></iframe>
          <h4 className="POD-h4">{this.state.title}</h4>
         
          <p className="POD-p">{this.state.explanation}</p>
          <br/>
        </div>
        <div>
          <h2 className="POD-h2">Add your comments</h2>
          <form onSubmit={this.addComment}>                                                                                          
            <textarea name='comment' onChange={this.handleFormChange} /> 
            <br/>       
            <input type='submit' value='Add Comment'/>
          </form>
        </div>
         <div>
           <br/>
           <br/>
           <h2 className="POD-h2">Comments</h2>
              <ul className="unordered">
                {comments}
              </ul>
          </div>
          {this.state.showEdit ? <EditComment editComment={this.editComment} handleFormChange={this.handleFormChange} commentToEdit={this.state.commentToEdit}/> : null}

      </div>
     
    );
  }
}
export default NasaApi;
