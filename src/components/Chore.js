import React from "react";
import '../styles/Chore.css'
// import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const Chore = ({ chore }) => {
    // const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        //write database
        //chore.isDone = !checked
        setChecked(!checked);
    };
    return (
        <div className="ChoreCard">
            <Grid container>
                <Grid item xs={2}>
                    <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </Grid>
                <Grid item xs>
                    <div className="ChoreName">
                        {chore.name}
                    </div>
                    {/*<Typography>{chore.isDone ? 'done': 'not done'}</Typography>*/}
                    <div className="ChoreGroup">{chore.group}</div>
                </Grid>
                <Grid item xs={6}>
                    <div className="DueDate">{"Due：" + chore.dueDate.toDateString()}</div>
                    {/*<Typography>{chore.dateCompleted ? `completed ${chore.dateCompleted.toDateString()}` : 'not completed'}</Typography>*/}
                </Grid>
            </Grid>
        </div>
    );
};

export default Chore;
