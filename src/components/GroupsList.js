import React, {useEffect, useState} from 'react';
import firebase from "../shared/firebase";
import {addGroups} from '../shared/filters';
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

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [uid, setUid] = useState();
    const [invite, setInvite] = useState();

    useEffect(() => {
        const dbInvite = db.child("currentInvite");
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
                if (snap.val()) setGroups(uid ? addGroups(uid, snap.val()) : []);
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
        uid
            ? (
                <div className='GridWrapper'>
                    {
                        groups.map((group) => (
                            <Group group={group} key={group.gid}/>
                        ))
                    }
                    <AddGroup uid={uid} invite={invite}/>
                    <JoinGroup uid={uid}/>
                </div>
            )
            : (
                <div>
                    <div className="ListSpacer"/>
                    <Typography variant="h5" style={{textAlign: 'center'}}>Loading...</Typography>
                </div>
            )

    );
};

const Group = ({group}) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{group.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List>
                    <ListItem>
                        <ListItemText>invite code: {group.gid}</ListItemText>
                    </ListItem>
                    {
                        group.members.map((member) => (
                            <ListItem key={member}>
                                <ListItemText>{member}</ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            </ExpansionPanelDetails>


        </ExpansionPanel>


    );
};

export default GroupsList;
