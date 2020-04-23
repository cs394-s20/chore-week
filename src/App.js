import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn/SignIn";
import ChoresList from "./components/ChoresList";
import './App.css';
import firebase from "./shared/firebase";
import GroupsList from "./components/GroupsList"

const pageSwitcher = (page, user) => {
    switch (page){
        case 0:
            return (<ChoresList user={user}/>)
        case 1:
            return (<GroupsList uid={user.uid}/>)
        default:
            return
    }
}

function App() {
    const [page, setPage] = useState(1)
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
                        pageSwitcher(page, user)
                        :
                        <SignIn uid={user ? user.uid : null}/>
                }
            </div>
            <Footer tabswitch={setPage}/>
        </div>
    );
}

export default App;
