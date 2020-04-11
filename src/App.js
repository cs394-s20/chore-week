import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChoresList from "./components/ChoresList";
// import laundry from './laundry.jpeg';

function App() {
  return (
      <div className="App-wrapper">
        <Header/>
        <div className="App-content">
            <ChoresList/>
        </div>
        <Footer/>
      </div>
  );
  // return (
  //   <div>
  //     <header className="App-header">
  //       <img src={laundry} className="App-logo" alt="folded clothes" />
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Chore Week
  //         <p>An app to help roommates divide chores evenly amongst
  //         themselves in a scheduled manner</p>
  //         <p>Roomates will get points for doing their chores on time
  //         and there will be a scoreboard to see who has the most points!</p>
  //       </a>
  //       <a className="Four-Panel"
  //         href="https://docs.google.com/presentation/d/1wDOsMZnHowiffjFEJkpiY4qBnGocy4PLzwiORfH0l_g/edit#slide=id.g165e981b56_0_342"
  //         target="_blank"
  //         rel="noopener noreferrer">
  //       Click to see the Four panel of our APP
  //       </a>
  //       <a className="Four-Panel"
  //         href="https://docs.google.com/presentation/d/1wDOsMZnHowiffjFEJkpiY4qBnGocy4PLzwiORfH0l_g/edit#slide=id.g165e981b56_0_342"
  //         target="_blank"
  //         rel="noopener noreferrer">
  //       Group Members: Xinzhe Du, Noah Alvarado, Nyle Arora, Jiazhe Liu, Bella Zhan, Xinyu Zhang
  //       </a>
  //       <a className="Four-Panel"
  //          href="https://github.com/cs394-s20/chore-week"
  //          target="_blank"
  //          rel="noopener noreferrer">
  //         GitHub Repository
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
