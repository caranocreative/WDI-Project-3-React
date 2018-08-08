import React, { Component } from 'react';

// use spacePicture 

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

    const picture = await fetch('http://localhost:9000/api/v1/picture/id');
    const pictureJson = await picture.json();
    return pictureJson

  }
  addPicture = async (picture, e) => {
    e.preventDefault();
    try {
        const createdPicture = await fetch('http://localhost:9000/api/v1/picture/id', {
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
        const deletePictureJson = await deletePicture.json();
        this.setState({picture: this.state.savedPicture.filter((picture, i) => savedPicture._id !== id)});
    } catch(err) {
      console.log(err, ' error')
    }
  }
  
  closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      const editResponse = await fetch('http://localhost:9000/api/v1/picture/id' + this.state.editPictureId, {
        method: 'PUT',
        body: JSON.stringify(this.state.pictureToEdit),
        headers:{
          'Content-Type': 'application/json'
        }
      });c

      const editResponseJson = await editResponse.json();
      const editedCommentsArray = this.state.sharedPicture.map((comment) => {

              if(comments._id === this.state.editPictureId){

                picture.comment = editResponseJson.data.comment;
                
              }

              return comment
      });
       this.setState({
        pictures: editedCommentsArray,
        showEdit: false
       });
    } catch(err) {
      console.log(err);
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
        <SavePicture image={this.state.picture} deleteImage={this.deleteImage}/>
        <CreatePicture addImage={this.addPicture}/>
        {this.state.showEdit ? <EditComments closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} commentsToEdit={this.state.commentsToEdit}/> : null}

      </div>
      )
  }
}

export default SpacePictures;