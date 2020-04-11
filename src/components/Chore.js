import React from "react";
import '../styles/Chore.css'
import Typography from '@material-ui/core/Typography';


const Chore = ({ chore }) => {
    return (
        <div className="ChoreCard">
            <Typography>{chore.name}</Typography>
            <Typography>{chore.isDone ? 'done': 'not done'}</Typography>
            <Typography>{chore.dueDate.toDateString()}</Typography>
            <Typography>{chore.dateCompleted ? `completed ${chore.dateCompleted.toDateString()}` : 'not completed'}</Typography>
        </div>
    );
};

export default Chore;
