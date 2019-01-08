import React, { Component } from 'react';
import './App.css';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'; // included with apollo boot
import { HttpLink } from 'apollo-link-http'; // included with apollo boot
import {ApolloProvider} from 'react-apollo';

// Apollo Client Setup
const client = new ApolloClient({
    link: new HttpLink({uri: "http://localhost:4000/graphql"}),
    cache: new InMemoryCache()
  }
)


// COMPONENTS

class App extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <ApolloProvider client={client} >
        <div className="App">
          <p>Music Fundamentals</p>
          <p>A learning tool for basic and intermediate music concepts</p>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
