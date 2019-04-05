import React, { Component } from 'react';
import '../styles/App.css';
import CreateTask from './CreateTask';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateTask />
      </div>
    );
  }
}

export default App;
