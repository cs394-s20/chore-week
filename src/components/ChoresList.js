import React from 'react';
import Chore from "./Chore";
import '../styles/ChoresList.css'
import Typography from '@material-ui/core/Typography';

const ChoresList = ({ title, chores }) => {
    return (
        <div className="ChoresListWrapper">
            <Typography variant="h4">{title}</Typography>
            <React.Fragment>
                { chores.map(chore => <Chore chore={chore}/>) }
            </React.Fragment>
        </div>
    );
};

export default ChoresList;
