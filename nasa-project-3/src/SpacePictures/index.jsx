import React, { Component } from 'react';
import Comments from '../Comments/comments';
import CreatePicture from '../CreatePicture/createPicture';
import DeletePicture from '../DeletePicture/delete';

class SpacePictures extends Component {
  constructor(){
    super();

    this.state = {
      savePicture: [],
      showEdit: false,
      editPictureId: null,
      comments: [],
      pictureToEdit: {
        title: '',
        explanation: '',
        url: ''
      }
    }
  }
  componentDidMount(){
    this.getPicture().then((savePicture) => {
      this.setState({savePicture: savePicture.data})
    }).catch((err) => {
      console.log(err);
    })
  }
  getPicture = async () => {

    const picture = await fetch('http://localhost:9000/api/v1/pictures/id');
    const pictureJson = await picture.json();
    return pictureJson

  }
  addPicture = async (picture, e) => {
    e.preventDefault();
    try {
        const createdPicture = await fetch('http://localhost:9000/api/v1/pictures/id', {
          method: 'POST',
          body: JSON.stringify(picture),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        const createdPictureJson = await createdPicture.json();
        this.setState({picture: [...this.state.savePicture, createdPictureJson.data]});

    } catch(err) {
      console.log(err)
    }
  }
  deletePicture = async (id, e) => {
    console.log(id, ' this is id')
    e.preventDefault();
    try {
        const deletePicture = await fetch('http://localhost:9000/api/v1/pictures/id' + id, {
          method: 'DELETE'
        });
        console.log('inside try')
        // const deletePictureJson = await deletePicture.json();
        // this.setState({url: this.state.savePicture.filter((picture, i) => savePicture._id !== id)});
    } catch(err) {
      console.log(err, ' error')
    }
  }
  
  closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      const editResponse = await fetch('http://localhost:9000/api/v1/pictures/id' + this.state.editPictureId, {
        method: 'PUT',
        body: JSON.stringify(this.state.pictureToEdit),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      
      // const editResponseJson = await editResponse.json();
     
      // const editedCommentsArray = this.state.sharedPicture.map((_comment) => { 
      //         if(comments._id === this.state.editPictureId){

      //           picture.comment = editResponseJson.data.comment;
                
      //         }

      //         return comments
      // });
       this.setState({
        // pictures: editedCommentsArray,
        showEdit: false
       });
    } catch(err) {
      console.log(err);
    }

  }
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nasaApiData = await fetch('http://localhost:9000/api/v1/pictures', {
        method: 'POST',
          body: JSON.stringify(this.state.url),
          headers:{
            'Content-Type': 'application/json'
          }
      })
    } catch (err) {
      console.log(err)
    }
  }  
  handleFormChange = (e) => {

    this.setState({
      commentsToEdit: {
        ...this.state.commentsToEdit,
        [e.target.name]: e.target.value
      }
    })
  }
  render(){
    console.log(this.state)
    return (
      <div>
        <addPicture image={this.state.savePicture} deleteImage={this.deleteImage}/>
        <CreatePicture addPicture={this.state.savePicture}/>
        <Comments closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} commentsToEdit={this.state.commentsToEdit}/>
        <DeletePicture deletePicture={this.deletePicture} handleFormChange={this.handleFormChange} />
      </div>
      )
  }
}

export default SpacePictures;