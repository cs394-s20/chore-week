import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/signin/signIn";

function App() {
  return (
    <div className="App-wrapper">
      <Header/>
      <div className="App-content">
        <SignIn />
      </div>
      <Footer/>
    </div>
  );
}

export default App;