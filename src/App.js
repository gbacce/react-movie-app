import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Poster from './Poster';

class App extends Component {

  constructor(props) {
    super(props);
    // In order to define a state variable, we place it in the constructor. 
    // It is defined as an object on this.state
    // This replaces getInitialState()
    this.state = {
      moviePosters: []
    }
  }

  componentDidMount() {
    console.log("I'm in the DOM");
    var url = 'http://api.themoviedb.org/3/movie/now_playing?&api_key=fec8b5ab27b292a68294261bb21b04a5'
    $.getJSON(url, (movieData)=>{
        console.log(movieData)
        // CHanging state will trigger a re-render
        this.setState({
          moviePosters:movieData.results
        })
        // NEVER EVER change state directly
        // this.state.moviePosters = movieData.results BAD!!!
    })
  }

// Every component must have a render member method
  render() {

    var postersArray = [];

    // First time through render, this will be an empty array
    // Second time through (after componentDidMount), it won't be empty
    this.state.moviePosters.map((poster,index)=>{
      // console.log(poster);
      postersArray.push(<Poster poster={poster} key={index} />)
      return
    });

    // After componentDidMount is finished changing state, postersArray looks like this
    // postersArray = [
    //   <Poster poster={poster} key={index} />,
    //   <Poster poster={poster} key={index} />,
    //   <Poster poster={poster} key={index} />,
    // ]


    return (
      <div className="App">
        
        <h1>Movie App</h1>
        {postersArray}
      </div>
    );
  }
}

export default App;