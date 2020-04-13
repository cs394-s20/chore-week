import React, {useEffect, useState} from 'react';
import firebase from "../shared/firebase";
import Chore from "./Chore";
import '../styles/ChoresList.css'
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";

const db = firebase.database().ref();

const addChores = (uid, data) => {
    const chores = Object.entries(data.users[uid]).map(entry => ({
        name: entry[0],
        group: entry[1].group,
        dueDate: new Date(entry[1].dueDate),
        isDone: !!entry[1].dateCompleted
    }));

    return {
        todo: chores.filter(chore => !chore.isDone),
        done: chores.filter(chore => chore.isDone)
    };
};

const ChoresList = ({user}) => {
    const [chores, setChores] = useState({todo: [], done: []});

    useEffect(() => {
            const handleData = snap => {
                if (snap.val()) setChores(addChores(user.uid, snap.val()));
            };

            db.on('value', handleData, error => alert(error));
            return () => {
                db.off('value', handleData);
            };
        },
        [
            user.uid
        ]);

    return (
        <div className="ChoresListWrapper">

            <Typography variant="h4">To Do</Typography>
            <List className="list-root">
                <React.Fragment>
                    {chores.todo.map(chore => <Chore key={chore.name}
                                                     chore={chore}/>)}
                </React.Fragment>
            </List>

            <Typography variant="h4">Done</Typography>
            <List className="list-root">
                <React.Fragment>
                    {chores.done.map(chore => <Chore key={chore.name}
                                                     chore={chore}/>)}
                </React.Fragment>
            </List>

        </div>
    );
};

export default ChoresList;
