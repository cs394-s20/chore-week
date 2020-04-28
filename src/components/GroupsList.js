import React, {useEffect, useState} from 'react';
import firebase from "../shared/firebase";
import {Grid, Paper} from "@material-ui/core"
import '../styles/GroupsList.css';
import AddGroup from "./AddGroup";
import JoinGroup from './JoinGroup';
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const db = firebase.database().ref();

const membersToNames = (data, members) => {
    return members.map((member) => {
        if(data.idToUser[member])
        return data.idToUser[member].displayName
    return member})
}

const addGroups = (uid, data) => {
    if (!uid) return;

    const array = [{gid: 'personal', name: 'personal', members:['me']}, ...Object.entries(data.groups).filter(
        ([gid, group]) => {
            return(Object.values(group)[0].includes(uid))
        }
    ).map(([gid, group]) => {
        return { gid, name: Object.keys(group)[0], members: membersToNames(data, Object.values(group)[0])};
    })]
    console.log(array);

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
                <React.Fragment>
                    {groups.map((group) => {
                        return (<Group group={group} key={group.gid}/>)
                    })}
                </React.Fragment>
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
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{group.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List>
                    {group.members.map((member) => {
                        return (<ListItem><ListItemText>{member}</ListItemText></ListItem>)
                    })}
                </List>
            </ExpansionPanelDetails>


        </ExpansionPanel>


    )
}

export default GroupsList


