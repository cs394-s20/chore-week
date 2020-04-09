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
        <a className="Four-Panel"
          href="https://docs.google.com/presentation/d/1wDOsMZnHowiffjFEJkpiY4qBnGocy4PLzwiORfH0l_g/edit#slide=id.g165e981b56_0_342"
          target="_blank"
          rel="noopener noreferrer">
        Click to see the Four panel of our APP
        </a>
      </header>
    </div>
  );
}

export default App;
