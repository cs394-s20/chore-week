import React, {useEffect, useState} from "react";
import '../styles/AddChore.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import firebase from "../shared/firebase";
const db = firebase.database().ref();

// TODO: Get groups from firebase

const addGroups = (uid, data) => Object.entries(data.groups).map(entry => entry[0]);


const AddChore = ({uid}) => {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState(['personal']);
    const [name, setName] = useState('New Chore');
    const [dueDate, setDueDate] = useState(Date.now());
    const [group, setGroup] = useState('personal');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const chore = {
            name: name,
            dueDate: dueDate,
            group: group
        };

        setOpen(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleGroupChange = (event) => {
        setGroup(event.target.value);
    };

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
            <Button color="primary" onClick={handleClickOpen}>Add Chore</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a chore</DialogTitle>
                <DialogContent className="dialog-root">
                    <div className="dialog-wrap">
                        <TextField id="chore-name"
                                   label="Chore Name"
                                   value={name}
                                   onChange={handleNameChange}/>
                        <div className="input-item">
                            <InputLabel id="group-label">Group</InputLabel>
                            <Select labelId="group-label"
                                    id="chore-group"
                                    value={group}
                                    onChange={handleGroupChange}
                            >
                                {
                                    groups.map(group => (
                                        <MenuItem key={group} value={group}>{group}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddChore;
