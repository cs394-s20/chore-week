import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Groups" icon={<GroupIcon />} />
      <BottomNavigationAction label="Me" icon={<PersonIcon />} />
      <BottomNavigationAction label="Scoreboard" icon={<InsertChartIcon />} />
    </BottomNavigation>
  );
}

export default Footer
