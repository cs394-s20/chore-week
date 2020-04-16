import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style = {{display: 'none'}} label="Groups" icon={<GroupIcon />} disabled />
      <BottomNavigationAction label="Me" icon={<PersonIcon />} />
      <BottomNavigationAction style={{display: 'none'}} label="Scoreboard" icon={<InsertChartIcon />} disabled />
    </BottomNavigation>
  );
}
