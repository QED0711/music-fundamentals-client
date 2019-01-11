import React, { Component } from 'react';
import './App.css';

// APOLLO
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'; // included with apollo boot
import { HttpLink } from 'apollo-link-http'; // included with apollo boot
import {ApolloProvider} from 'react-apollo';

// REACT ROUTER
import {BrowserRouter, Route} from "react-router-dom";

// STATE
import defaultState from './defaultState'

// COMPONENTS
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import LessonsList from './components/LessonsList';

import InstructorLogin from './components/InstructorPortal/InstructorLogin';
import InstructorLessons from './components/InstructorPortal/InstructorLessons';

import LessonContainer from './components/LessonViews/LessonContainer';

// Apollo Client Setup
const client = new ApolloClient({
    link: new HttpLink({uri: "http://localhost:4000/graphql"}),
    cache: new InMemoryCache()
  }
)


class App extends Component {
  constructor(props){
    super(props);

    this.state = defaultState;

    // this.fetchLessons = this.fetchLessons.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.setCurrentLesson = this.setCurrentLesson.bind(this);
    this.setCurrentLessonNull = this.setCurrentLessonNull.bind(this);
    
    this.stateMethods = {}
    for(let item in this){
      if(typeof this[item] === 'function' && item !== 'forceUpdate' && item !== 'setState'){
        this.stateMethods[item] = this[item]
      } 
    }

  }

  handleLoginChange(){
    let userEmail = document.getElementById("email-input").value
    let userPassword = document.getElementById("password-input").value
    this.setState({
      userLogin: {
        email: userEmail,
        password: userPassword
      }
    })
  }

  loginUser(user){
    if(user && user.name){
      this.setState({
        currentUser: {
          signedIn: true,
          email: user.email,
          id: user.id,
          name: user.name,
          authorization: user.authorization
        }
      })
      
    }
  }

  setCurrentLesson(currentLesson){
    this.setState({
      currentLesson
    })
  }

  setCurrentLessonNull(){
    this.setState({
      currentLesson: {
        id: null,
        instructorId: null,
        title: null,
        description: null,
        tags: null,
      } 
    })
  }



  render() {
    console.log(this.state)
    return (
      <ApolloProvider client={client} >
      <BrowserRouter>
        <div className="App">

          <Banner title={this.state.pageTitle}/>
          <Navigation stateMethods={this.stateMethods}/>
          
          {/* ===== ROUTES ===== */}

          <Route path="/" exact component={Landing} />
          <Route path="/lessons" exact 
              render={props => <LessonsList {...props} state={this.state} stateMethods={this.stateMethods} />}
            />
          <Route path="/instructors/login" exact 
              render={props => <InstructorLogin {...props} state={this.state} stateMethods={this.stateMethods}/>}
            />
          
          <Route path="/instructors/lessons" exact 
              render={props => <InstructorLessons {...props} state={this.state} stateMethods={this.stateMethods}/>}
            />

            {/* ===== ROUTES ===== */}

          <Route path="/lessons/:id" 
            render={props => <LessonContainer  {...props} state={this.state} stateMethods={this.stateMethods}/>}
          />

        </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
