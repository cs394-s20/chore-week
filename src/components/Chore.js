import React from "react";
import '../styles/Chore.css'
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';

const getDueColor = (chore) => {
    let color = { backgroundColor: 'rgba(64, 230, 18, 0.8)' };
    if (!chore.isDone) color = {
        backgroundColor: chore.dueDate <= Date.now() ? 'rgba(245, 73, 47, 0.8)' : 'rgba(255, 242, 0, 0.8)'
    };

    return color;
};


const Chore = ({chore}) => {
    const [checked, setChecked] = React.useState(chore.isDone);
    const [dueColor, setDueColor] = React.useState(getDueColor(chore));

    const handleChange = () => {
        chore.isDone = !checked;
        setChecked(!checked);
        setDueColor(getDueColor(chore));

        // update firebase
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

        // <div className="ChoreCard">
        //     <Grid container>
        //         <Grid item xs={2}>
        //             <Checkbox checked={checked}
        //                       onChange={handleChange}
        //                       inputProps={{'aria-label': 'primary checkbox'}}
        //             />
        //         </Grid>
        //         <Grid item xs>
        //             <div className="ChoreName">
        //                 {chore.name}
        //             </div>
        //             <div className="ChoreGroup">{chore.group}</div>
        //         </Grid>
        //         <Grid item xs={6}>
        //             <div className={`DueDate ${dueColor}`}>
        //                 {"Due：" + chore.dueDate.toDateString()}
        //             </div>
        //         </Grid>
        //     </Grid>
        // </div>
    );
};

export default Chore;
