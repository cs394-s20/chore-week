import React from "react";
import firebase from "../shared/firebase";
import '../styles/Chore.css'
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';

const db = firebase.database().ref();

const getDueColor = (chore) => {
    let color = { backgroundColor: 'rgba(64, 230, 18, 0.8)' };
    if (!chore.isDone) color = {
        backgroundColor: chore.dueDate <= Date.now() ? 'rgba(245, 73, 47, 0.8)' : 'rgba(255, 242, 0, 0.8)'
    };

    return color;
};

const updateChore = (uid, chore) => {
    if (chore.isDone) {
        const now = new Date();
        db.child('users').child(uid).child(chore.name).update({dateCompleted: now.toString()})
            .catch(error => alert(error));
    }
    else {
        db.child('users').child(uid).child(chore.name).child("dateCompleted").remove()
            .catch(error => alert(error));
    }
};

const Chore = ({ uid, chore }) => {
    const [checked, setChecked] = React.useState(chore.isDone);
    const [dueColor, setDueColor] = React.useState(getDueColor(chore));

    const handleChange = () => {
        chore.isDone = !checked;
        setChecked(!checked);
        setDueColor(getDueColor(chore));

        updateChore(uid, chore);
    };

    return (
        <ListItem className="ChoreWrapper">
            <ListItemIcon>
                <Checkbox checked={checked}
                          onChange={handleChange}
                          inputProps={{'aria-label': 'primary checkbox'}}
                />
            </ListItemIcon>
            <ListItemText primary={chore.name}
                          secondary={chore.group}
            />
            <ListItemSecondaryAction>
                <Chip label={chore.dueDate.toDateString()}
                      style={dueColor}
                      icon={ <QueryBuilderOutlinedIcon style={{color: 'black'}}/> }
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Chore;
