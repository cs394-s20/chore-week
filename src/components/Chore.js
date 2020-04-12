import React from "react";
import '../styles/Chore.css'
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const getDueColor = (chore) => {
    if (chore.isDone) return 'Completed';
    return chore.dueDate <= Date.now() ? 'Overdue' : 'Due';
};


const Chore = ({ chore }) => {
    const [checked, setChecked] = React.useState(chore.isDone);
    const [dueColor, setDueColor] = React.useState(getDueColor(chore));

    const handleChange = () => {
        chore.isDone = !checked;
        setChecked(!checked);
        setDueColor(getDueColor(chore));

        // update firebase
    };

    return (
        <div className="ChoreCard">
            <Grid container>
                <Grid item xs={2}>
                    <Checkbox checked={checked}
                              onChange={handleChange}
                              inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </Grid>
                <Grid item xs>
                    <div className="ChoreName">
                        {chore.name}
                    </div>
                    <div className="ChoreGroup">{chore.group}</div>
                </Grid>
                <Grid item xs={6}>
                    <div className={`DueDate ${dueColor}`}>
                        {"Due：" + chore.dueDate.toDateString()}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Chore;
