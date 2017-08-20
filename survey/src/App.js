import React, { Component } from 'react';
import './App.css';
let uuid = require('uuid');
let firebase = require('firebase');
let config = {
    apiKey: "AIzaSyAZuQZGqJbg84IYRE2JEdfTmqbTaeIvKr0",
    authDomain: "simple-survey-4b3ee.firebaseapp.com",
    databaseURL: "https://simple-survey-4b3ee.firebaseio.com",
    projectId: "simple-survey-4b3ee",
    storageBucket: "simple-survey-4b3ee.appspot.com",
    messagingSenderId: "1041348638871"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answer: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(e){
    var name = this.refs.name.value;
    e.preventDefault();
    this.setState({name: name});
  }

  handleQuestionSubmit(e){
    e.preventDefault();
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });
    this.setState({submitted: true}, function(){
      console.log("Questions submitted!");
    });
  }

  handleQuestionChange(e){
    var answers = this.state.answer;
    if(e.target.name === "q1"){
      answers.q1 = e.target.value;
    } else if(e.target.name === "q2") {
      answers.q2 = e.target.value;
    }else if(e.target.name === "q3") {
      answers.q3 = e.target.value;
    }else if(e.target.name === "q4") {
      answers.q4 = e.target.value; 
    }
    this.setState({answers: answers})
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite operating system?</label><br/> 
            <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange}/>Windows<br/>
            <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange}/>OSX<br/>
            <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange}/>Linux<br/>
            <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange}/>Solaris<br/>
            <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange}/>Other <br/>
          </div>
          <div>
            <label>What is your favorite TV brand?</label><br/> 
            <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange}/>Sony<br/>
            <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br/>
            <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange}/>Panasonic<br/>
            <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange}/>Vizio<br/>
            <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange}/>Other <br/>
          </div>
          <div>
            <label>What is your favorite smartphone brand?</label><br/> 
            <input type="radio" name="q3" value="Apple" onChange={this.handleQuestionChange}/>Apple<br/>
            <input type="radio" name="q3" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br/>
            <input type="radio" name="q3" value="Nexus" onChange={this.handleQuestionChange}/>Nexus<br/>
            <input type="radio" name="q3" value="Blackberry" onChange={this.handleQuestionChange}/>Blackberry<br/>
            <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange}/>Other <br/>
          </div>
          <div>
            <label>What is your favorite CPU brand?</label><br/> 
            <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange}/>Intel<br/>
            <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange}/>AMD<br/>
            <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange}/>Nvidia<br/>
            <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange}/>ARM<br/>
            <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange}/>Other <br/>
          </div>
          <input type="submit" onSubmit={this.handleQuestionSubmit} />
        </form>
      </span>
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
      <div className="App">
        <div className="App-header text-center ">
          <h2>React Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
