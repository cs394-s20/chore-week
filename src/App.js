import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChoresList from "./components/ChoresList";

const old = new Date(2020, 3, 4);
const now = new Date();
const soon = new Date(2020, 3, 13);

const chores = {
    todo: [
        {
            name: "laundry",
            isDone: false,
            dueDate: soon,
            dateCompleted: null
        },
        {
            name: "dishes",
            isDone: false,
            dueDate: old,
            dateCompleted: null
        }
    ],
    done: [
        {
            name: "sweep",
            isDone: true,
            dueDate: now,
            dateCompleted: old
        }
    ]
};

function App() {
  return (
      <div className="App-wrapper">
        <Header/>
        <div className="App-content">
            <ChoresList title="To Do"
                        chores={chores.todo}/>
            <ChoresList title="Done"
                        chores={chores.done}/>
        </div>
        <Footer/>
      </div>
  );
}

export default App;
