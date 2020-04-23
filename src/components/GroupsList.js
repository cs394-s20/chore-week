import React, {useEffect, useState} from 'react';
import firebase from "../shared/firebase";
import {Grid} from "@material-ui/core"
const db = firebase.database().ref();

const addGroups = (uid, data) => {
    return ['personal', ...Object.entries(data.groups).filter(
        entry => Object.keys(entry[1]).some(id => id === uid)).map(
        entry => entry[0]
    )]
}

const GroupsList = (uid) => {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
            const handleData = snap => {
                if (snap.val()) setGroups(addGroups(uid, snap.val()));
            };

            db.on('value', handleData, error => alert(error));
            return () => {
                db.off('value', handleData);
            };
        },
        [
            uid
        ]);
    return (
        <div>
            <Grid container direction="row" justify="flex-start" align-items="flex-start">
                <React.Fragment>
                    {groups.map((group) => {
                        return (<Group group={group} key={group.name} xs={6}/>)
                    })}
                </React.Fragment>
            </Grid>
        </div>
    )
}

const Group = (group) => {
    return (
        <div>
            {group.name}
        </div>
    )
}

export default GroupsList


