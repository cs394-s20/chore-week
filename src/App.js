import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn/SignIn";
import ChoresList from "./components/ChoresList";
import './App.css';
import firebase from "./shared/firebase";

function App() {
    const [user, setUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
    }, []);

    return (
        <div className="App-wrapper">
            <Header/>
            <div className="App-content">
                {
                    user ?
                        <ChoresList user={user}/>
                        :
                        <SignIn uid={user ? user.uid : null}/>
                }
            </div>
            <Footer/>
        </div>
    );
}

export default App;
