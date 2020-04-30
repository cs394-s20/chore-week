import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, {useEffect, useState} from "react";
import {addChoresByGroup, addGroups} from "../shared/filters"
import firebase from "../shared/firebase";
import Chore from "./Chore";

const db = firebase.database().ref();

const Group = ({uid, group}) => {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) setChores(addChoresByGroup(group.gid, uid, snap.val()));
        };

        db.on('value', handleData, error => alert(error));
        return () => {
            db.off('value', handleData);
        };
    },[]);


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
                        chores.map((chore) => (<div key={chore.cid}>{chore.name}</div>))
                    }
                </List>
            </ExpansionPanelDetails>


        </ExpansionPanel>


    );
};

export default Group;