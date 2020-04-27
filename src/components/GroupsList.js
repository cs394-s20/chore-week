import React, {useEffect, useState} from 'react';
import firebase from "../shared/firebase";
import {Grid, Paper} from "@material-ui/core"
import '../styles/GroupsList.css';
import AddGroup from "./AddGroup";
import JoinGroup from './JoinGroup';
import Typography from "@material-ui/core/Typography";

const db = firebase.database().ref();

const addGroups = (uid, data) => {
    if (!uid) return;

    const array = [{gid: 'personal', name: 'personal'}, ...Object.entries(data.groups).filter(
        ([gid, group]) => {
            return(Object.values(group)[0].includes(uid))
        }
    ).map(([gid, group]) => {
        return { gid, name: Object.keys(group)[0]};
    })]

    return(array)
}

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [uid, setUid] = useState();
    const [invite, setInvite] = useState();

    useEffect(() => {
        const dbInvite = db.child("CurrentInvite");
        const handleData = snap => {
            if (snap.val()) setInvite(snap.val());
        };

        dbInvite.on('value', handleData, error => alert(error));
        return () => {
            dbInvite.off('value', handleData);
        };
    })

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
            }
        });
    });

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
        uid !== window.undefined ?
        (
            <div className='GridWrapper'>
                <Grid container justify="center" align-items="flex-start" spacing={3}>
                    <React.Fragment>
                        {groups.map((group) => {
                            return (<Group group={group} key={group.gid}/>)
                        })}
                    </React.Fragment>
                </Grid>
                <AddGroup uid={uid} invite={invite}/>
                <JoinGroup uid={uid}/>
            </div>
        )
        :
        (
            <div>
                <div className="ListSpacer"/>
                <Typography variant="h5" style={{textAlign: 'center'}}>Loading...</Typography>
            </div>
        )
        
    )
}

const Group = ({group}) => {
    return (
        <Grid item xs={6}>
            <Paper className='card'>
                {group.gid} | {group.name}
            </Paper>
        </Grid>
    )
}

export default GroupsList


