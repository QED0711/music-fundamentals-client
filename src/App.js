import React, { Component } from 'react';
import './App.css';

// APOLLO
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'; // included with apollo boot
import { HttpLink } from 'apollo-link-http'; // included with apollo boot
import {ApolloProvider} from 'react-apollo';

// REACT ROUTER
import {BrowserRouter, Route, Link} from "react-router-dom";

// STATE
import defaultState from './defaultState'

// COMPONENTS
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import LessonsList from './components/LessonsList';
import InstructorLogin from './components/InstructorLogin';

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

  }
  render() {
    return (
      <ApolloProvider client={client} >
      <BrowserRouter>
        <div className="App">

          <Banner title={this.state.pageTitle}/>
          <Navigation />
          <Route path="/" exact component={Landing} />
          <Route path="/lessons" exact component={LessonsList} />
          <Route path="/instructors/login" exact component={InstructorLogin} />
        </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
