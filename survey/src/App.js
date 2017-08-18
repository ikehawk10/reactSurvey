import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      answer: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }
  }

  handleNameSubmit(e){
    var name = this.refs.name.value;
    e.preventDefault();
    this.setState({name: name});
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter name..." ref="name"/>
        </form>
      </span>
      questions = '';
    } else if(this.state.submitted){

    }
    return (
      <div className="App text-center">
        <div className="App-header">
          <h2>React Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
      </div>
    );
  }
}

export default App;
