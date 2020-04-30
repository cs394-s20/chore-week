import React, { useEffect, useState } from 'react';
import firebase from "../shared/firebase";
import Chore from "./Chore";
import '../styles/ChoresList.css'
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import AddChore from "./AddChore";
import { addChores } from '../shared/filters';

const db = firebase.database().ref();

const ToDo = ({user, chores}) => {
    return (
        <List className="list-root">
            <React.Fragment>
                {chores.todo.map(chore => <Chore key={chore.cid}
                                                 uid={user.uid}
                                                 chore={chore}/>)}
            </React.Fragment>
        </List>
    );
};

const Done = ({user, chores}) => {
    return (
        <List className="list-root">
            <React.Fragment>
                {chores.done.map(chore => <Chore key={chore.cid}
                                                 uid={user.uid}
                                                 chore={chore}/>)}
            </React.Fragment>
        </List>
    );
};

const ChoresList = () => {
    const [chores, setChores] = useState({todo: [], done: []});
    const [user, setUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
            if (!user) return;
            const handleData = snap => {
                if (snap.val()) setChores(addChores(user.uid, snap.val()));
            };

            db.on('value', handleData, error => alert(error));
            return () => {
                db.off('value', handleData);
            };
        },
        [
            user
        ]);

    return (
        <div className="ChoresListWrapper">
            {
                user ?
                    (
                        <div>
                            <div className="ListSpacer"/>

                            <Typography variant="h4" style={{marginLeft: 8}}>To Do</Typography>
                            <ToDo user={user} chores={chores}/>

                            <div className="ListSpacer"/>

                            <Typography variant="h4" style={{marginLeft: 8}}>Done</Typography>
                            <Done user={user} chores={chores}/>

                            <div className="ListSpacer"/>
                            <AddChore uid={user.uid} username={user.displayName}/>
                        </div>
                    )
                    :
                    (
                        <div>
                            <div className="ListSpacer"/>
                            <Typography variant="h5" style={{textAlign: 'center'}}>Loading...</Typography>
                        </div>
                    )
            }
        </div>
    );
};

export default ChoresList;
