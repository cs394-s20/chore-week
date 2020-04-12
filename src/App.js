import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn/SignIn";
import ChoresList from "./components/ChoresList";
import './App.css';
import firebase from "./shared/firebase";

const old = new Date(2020, 3, 4);
const now = new Date();
const soon = new Date(2020, 3, 13);

const tempChores = {
    todo: [
        {
            name: "laundry",
            group: "personal",
            isDone: false,
            dueDate: soon,
            dateCompleted: null
        },
        {
            name: "dishes",
            group: "1234 Garnett",
            isDone: false,
            dueDate: old,
            dateCompleted: null
        }
    ],
    done: [
        {
            name: "sweep",
            group: "1234 Garnett",
            isDone: true,
            dueDate: now,
            dateCompleted: old
        }
    ]
};

function App() {
    const [chores, setChores] = useState({ todo: [], done: [] });
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
                        <React.Fragment>
                            <ChoresList title="To Do"
                                        chores={chores.todo}/>
                            <ChoresList title="Done"
                                        chores={chores.done}/>
                        </React.Fragment>
                        :
                        <SignIn/>
                }
            </div>
            <Footer/>
        </div>
    );
}

export default App;
