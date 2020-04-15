import React, {useState} from "react";
import '../styles/AddChore.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, List, ListItem, MenuItem, Select, TextField } from "@material-ui/core";


// TODO: Get groups from firebase
const getGroups = () => ['personal'];

const AddChore = () => {
    const [open, setOpen] = useState(false);

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

        console.log(chore);
        setOpen(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleGroupChange = (event) => {
        setGroup(event.target.value);
    };

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
                                    getGroups().map(group => (
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
