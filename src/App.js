import React from 'react';
import laundry from './laundry.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={laundry} className="App-logo" alt="folded clothes" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chore Week
          <p>An app to help roommates divide chores evenly amongst 
          themselves in a scheduled manner</p>
          <p>Roomates will get points for doing their chores on time 
          and there will be a scoreboard to see who has the most points!</p>
        </a>
      </header>
    </div>
  );
}

export default App;
