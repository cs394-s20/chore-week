import React, { useEffect, useState } from "react";
import '../styles/AddChore.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import firebase from "../shared/firebase";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const db = firebase.database().ref();

const addGroups = (uid, data) => {
    const array = ['personal', ...Object.entries(data.groups).filter(
        ([gid, group]) => {
            return(Object.values(group)[0].includes(uid))
        }
    ).map(([gid, group]) => Object.keys(group)[0])]
    return(array)
}


const AddChore = ({uid}) => {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState(['personal']);
    const [name, setName] = useState('New Chore');
    const [dueDate, setDueDate] = useState(new Date());
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

        chore.dueDate.setHours(23)
        chore.dueDate.setMinutes(59)
        chore.dueDute = chore.dueDate.toString()

        // console.log(chore);
        db.child('users').child(uid).update(
          {[chore.name]:
            {dueDate:chore.dueDate, group: chore.group}}).catch(error => alert(error));
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
                         <div>
                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             id="date-picker-inline"
                             label="Date picker inline"
                             value={dueDate}
                             onChange={setDueDate}
                             KeyboardButtonProps={{
                               'aria-label': 'change date',
                             }}
                           />
                         </MuiPickersUtilsProvider>
                         </div>
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
