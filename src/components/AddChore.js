import React, {useState} from "react";
import { Button, Dialog, DialogActions, DialogTitle, List, ListItem } from "@material-ui/core";

const AddChore = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>Add Chore</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a chore</DialogTitle>
                <List>
                    <ListItem>NameOfChore</ListItem>
                    <ListItem>DueDateOfChore</ListItem>
                    <ListItem>GroupOfChore</ListItem>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </List>
            </Dialog>
        </div>
    );
};

export default AddChore;
