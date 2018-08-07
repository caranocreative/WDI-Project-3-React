import React, { Component } from 'react';

// dropped this here from Movies to work from for CRUD

class MainContainer extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      showEdit: false,
      editMovieId: null,
      movieToEdit: {
        title: '',
        description: ''
      }
    }
  }
  componentDidMount(){
    this.getMovies().then((movies) => {
      this.setState({movies: movies.data})
    }).catch((err) => {
      console.log(err);
    })
  }
  getMovies = async () => {

    const movies = await fetch('http://localhost:9000/api/v1/movies');
    const moviesJson = await movies.json();
    return moviesJson

  }
  addMovie = async (movie, e) => {
    e.preventDefault();
    try {
        const createdMovie = await fetch('http://localhost:9000/api/v1/movies', {
          method: 'POST',
          body: JSON.stringify(movie),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        const createdMovieJson = await createdMovie.json();
        this.setState({movies: [...this.state.movies, createdMovieJson.data]});

    } catch(err) {
      console.log(err)
    }
  }
  deleteMovie = async (id, e) => {
    console.log(id, ' this is id')
    e.preventDefault();
    try {
        const deleteMovie = await fetch('http://localhost:9000/api/v1/movies/' + id, {
          method: 'DELETE'
        });
        console.log('inside try')
        const deleteMovieJson = await deleteMovie.json();
        this.setState({movies: this.state.movies.filter((movie, i) => movie._id !== id)});
    } catch(err) {
      console.log(err, ' error')
    }
  }
  showModal = (id, e) => {
    // i comes before e, when called with bind
    const movieToEdit = this.state.movies.find((movie) => movie._id === id)
    console.log(movieToEdit, ' movieToEdit')
    this.setState({
                  showEdit: true,
                  editMovieId: id,
                  movieToEdit: movieToEdit
                  });
  }
  closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      const editResponse = await fetch('http://localhost:9000/api/v1/movies/' + this.state.editMovieId, {
        method: 'PUT',
        body: JSON.stringify(this.state.movieToEdit),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      const editResponseJson = await editResponse.json();
      const editedMovieArray = this.state.movies.map((movie) => {

              if(movie._id === this.state.editMovieId){

                movie.title = editResponseJson.data.title;
                movie.description = editResponseJson.data.description;
              }

              return movie
      });
       this.setState({
        movie: editedMovieArray,
        showEdit: false
       });
    } catch(err) {
      console.log(err);
    }

  }
  handleFormChange = (e) => {

    this.setState({
      movieToEdit: {
        ...this.state.movieToEdit,
        [e.target.name]: e.target.value
      }
    })
  }
  render(){
    console.log(this.state)
    return (
      <div>
        <Movies movies={this.state.movies} deleteMovie={this.deleteMovie} showModal={this.showModal}/>
        <CreateMovie addMovie={this.addMovie}/>
        {this.state.showEdit ? <EditMovie closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} movieToEdit={this.state.movieToEdit}/> : null}

      </div>
      )
  }
}

export default MovieContainer;